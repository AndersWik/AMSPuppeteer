module.exports = {
  jobIndexPages: function (number) {
      return 'https://www.arbetsformedlingen.se/For-arbetssokande/Platsbanken/annonser?pd=0&sort=1&page='+number+'&loc=&prof=&profAr=YRKESOMRADE_ROLL:3:Data%2FIT';
  },
  jobPage: function (id) {
    return '/af/v1/matchning/matchandeRekryteringsbehov/'+id;
  }
};