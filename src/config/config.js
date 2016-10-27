const config = {
  debug: true,
  version: '2.0.0.beta.0',
  APIGatewayAddress: 'http://10.16.75.24:3000',
  configServiceAddress: 'http://10.16.75.24:3000/eggkeeper/v1',
  DomainName: 'Newkit',
  SSOAddress: 'http://10.16.75.26:8501',
  NewkitAPI: 'http://10.16.75.27:9031/newegg-central-2/v1',
  Applications: ['1f48a705-b734-476c-b32b-29359177c122']
};

window.NewkitConf = config;