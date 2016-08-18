const config = {
  debug: true,
  APIGatewayAddress: 'http://10.16.75.24:3000',
  configServiceAddress: 'http://10.16.75.24:3000/eggkeeper/v1'
};

(<any>window).NewkitConf = config;