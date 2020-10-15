const acceptOrderOperation = require('src/app/operations/ubereats/acceptOrderOperation');

describe('App :: Operations :: AcceptOrderOperation', () => {
    describe('#execute', () => {
        let acceptOrder = {},
            acceptOrderService = {};
        beforeEach(() => {
            config = {
                'integration': {
                    'rest': {
                        'uberEats': {
                            'baseURL': 'http://localhost:4000/',
                            'timeout': 10000,
                            'rejectUnauthorized': false
                        }
                    }
                }
            };

            acceptOrderService = {
                execute: jest.fn()
            };

            acceptOrder = acceptOrderOperation({
                acceptOrderService,
                config
            });
        });

        it('Should return sucess', async () => {
            const data = {
                order_id: 'c4d2261e-2779-4eb6-beb0-cb41235c751e',
                reason: 'accepted'
            };
            await acceptOrder.execute(data);
            expect(acceptOrderService.execute).toHaveBeenCalledWith(data);
        });

    });
});
