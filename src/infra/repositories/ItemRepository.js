const ItemDomainEntity = {
    "origin": "IFOOD",
    "originOrderId": "abc-456-afge-451-n15484",
    "scheduled": false,
    "originShortReference": "abc234562233",
    "placedAt": "2021-06-30T18:22:54.232Z",
    "invoiceDocument": "77788866655",
    "ackPending": false,
    "serviceType": "DELIVERY",
    "cancellationCode": "503",
    "cancellationReason": "503",
    "posIntegrationError": "503",
    "timeToAcceptInSeconds": 3600,
    "status": "IN_PREPARATION",
    "preparation": {
        "preparationTimeInSeconds": 13000,
        "minPreparationTimeInSeconds": 10000,
        "maxPreparationTimeInSeconds": 15000
    },
    "packaging": {
        "shouldIncludeDisposableItems": true
    },
    "payment": {
        "paymentMethods": [
        {
            "name": "string",
            "code": "string",
            "issuer": "string",
            "prepaid": "string",
            "method": "string",
            "value": 0,
            "changeFor": 0
        }
        ],
        "charges": {
        "subTotal": 2000,
        "total": 2000,
        "totalDiscounts": 0,
        "totalInCash": 2000,
        "tip": 0,
        "tax": 0,
        "packagingFee": 0,
        "deliveryFee": 0,
        "serviceFee": 0,
        "totalFee": 0,
        "totalFeeTax": 0
        }
    },
    "customer": {
        "originId": "114235279",
        "firstName": "Lucas",
        "lastName": "Procopio",
        "displayName": "Lucas H Procopio ",
        "document": "77788866655",
        "phoneNumber": "0800 + ID",
        "email": "mail@mail.com",
        "ordersCount": 1
    },
    "cart": {
        "originId": "123123123",
        "notes": "Observações sobre o pedido",
        "items": [
        {
            "originId": "123123",
            "sku": "44423212",
            "name": "Nome do produto",
            "type": "Tipo do produto",
            "quantity": 1,
            "description": "Dados complementares sobre o produto fornecidos pelo estabelecimento",
            "comments": "Comentarios sobre o produto fornecidos pelo cliente",
            "image": "Endereço da imagem do produto",
            "unitPrice": 2000,
            "totalPrice": 2000,
            "baseUnitPrice": 2000,
            "baseTotalPrice": 2000,
            "discount": 0,
            "addition": 0,
            "subItems": [
            {
                "name": "Nome do sub-item",
                "quantity": 1,
                "unitPrice": 0,
                "totalPrice": 0,
                "discount": 0,
                "addition": 0
            }
            ]
        }
        ]
    },
    "delivery": {
        "deliveredAt": "2021-06-30T18:22:54.232Z",
        "deliveryDateTime": "2021-06-30T18:22:54.232Z",
        "deliveredBy": "string",
        "trackingStatus": "string",
        "worker": {
        "name": "Foo",
        "phoneNumber": "0800 + ID",
        "instructions": "Deixar em cima do balcão.",
        "photo": "string",
        "latitude": "-23.1231232",
        "longitude": "-43.123232",
        "eta": 650,
        "firstEta": 650
        },
        "address": {
        "formattedAddress": "ENTREGAR - Ramal Bujari, 10",
        "country": "BR",
        "state": "AC",
        "city": "Bujari",
        "neighborhood": "Bairro",
        "streetName": "Nome da rua",
        "number": "102",
        "postalCode": "6992300",
        "complement": "Complemento do endereço",
        "reference": "Ponto de referência",
        "coordinates": {
            "latitude": "-9.821256",
            "longitude": "-67.948009"
        }
        }
    }
};


module.exports = () => ({
    list: async function () {
        const items = [];
        for (let i = 0; i < 40; i++) {
            items.push({
                ...ItemDomainEntity,
                id: i + 1,
            })
        }
        return items;
    }
});
