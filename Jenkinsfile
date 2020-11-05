    // Main variables (Do not modify, they are here just to be documented)
// See more in http://<jenkins_address>:8080/env-vars.html/
println "BUILD_TAG: " + BUILD_TAG
println "BRANCH_NAME: " + BRANCH_NAME
println "JOB_NAME: " + JOB_NAME
println "JOB_BASE_NAME: " + JOB_BASE_NAME
println "BUILD_NUMBER: " + BUILD_NUMBER
println "JOB_BASE_NAME: " + JOB_BASE_NAME

// Common Defs
DEPLOY_TARGET = ['develop', 'main']
REGISTRY_URL="208178144836.dkr.ecr.us-east-1.amazonaws.com"
IMAGE_BASE_NAME="quiq.<SERVICENAME>"

properties([disableConcurrentBuilds(), pipelineTriggers([])])

node ('master'){
    if (BRANCH_NAME in DEPLOY_TARGET){
        
        prepareSCM()

        target()

        build()

        deploy()

    }
}

def prepareSCM() {
    stage("Prepare SCM") {
        deleteDir()
        checkout scm
    }
}

def target() {
     stage('Verifying target') {
         script {
           try {  
           GITTAG = sh ( 
               returnStdout:  true, 
               script: "git describe --tags --abbrev=0"
            ).trim()
           } catch (err) {
                GITTAG = "NT"
            }
           if (BRANCH_NAME == 'main') {
             DOCKER_TAG_PREFIX = "${GITTAG}"
             ENVIRONMENT = "production"
           }
           if (BRANCH_NAME == 'develop' && GITTAG.contains('homolog')) {
             DOCKER_TAG_PREFIX = "${BUILD_NUMBER}-${GITTAG}"
             ENVIRONMENT = "homolog"
           }
           else {
             DOCKER_TAG_PREFIX = "${BUILD_NUMBER}-${GITTAG}"
             ENVIRONMENT = "develop"
           }
         }
     }
}

def build() {
    stage("Build and Push") {
        /* Gettin DOCKER_TAG */
        /*DOCKER_TAG = sh (script: "grep version package.json | awk -F'\"' {'print \$4'}", returnStdout: true
        ).trim()*/
        sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 208178144836.dkr.ecr.us-east-1.amazonaws.com"
            
        docker.withRegistry("http://${REGISTRY_URL}") {
            def customImage = docker.build("${REGISTRY_URL}/${IMAGE_BASE_NAME}:${DOCKER_TAG_PREFIX}", "--build-arg ENVIRONMENT=${ENVIRONMENT} .")
            /* Push the container to the custom Registry */
            customImage.push()
        }
        sh "docker rmi ${REGISTRY_URL}/${IMAGE_BASE_NAME}:${DOCKER_TAG_PREFIX}"
    }
}

def deploy() {
    stage("Deploy") {
        IMAGE_BASE_NAME_SED=IMAGE_BASE_NAME.replaceAll("\\.","\\\\.");
        println(REGISTRY_URL + "/" + IMAGE_BASE_NAME + ":" + DOCKER_TAG_PREFIX + "");
        sh """
            git clone --single-branch -b master git@git.4all.com:quiq/infra/quiq.chart.git
            cd quiq.chart
            ls -lh
            sed -i '/${IMAGE_BASE_NAME_SED}/!b;n;c\\    tag:\\ \\"${DOCKER_TAG_PREFIX}\\"' quiq/values-${ENVIRONMENT}.yaml
            git add quiq/values-${ENVIRONMENT}.yaml
            git commit -m "Change image ${IMAGE_BASE_NAME}:${DOCKER_TAG_PREFIX}"
            git push origin master
            cd quiq
            sudo su -c "helm upgrade -i ${ENVIRONMENT}-quiq . -f values-${ENVIRONMENT}.yaml --namespace ${ENVIRONMENT}-quiq"
        """
    }
}