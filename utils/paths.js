
var profession = 3;

module.exports = {
  setProfession: function (number) {
    profession = number;
  },
  jobIndexPages: function (number) {

    let url = 'https://www.arbetsformedlingen.se/For-arbetssokande/platsbanken/annonser?pd=0&sort=1&page='+number+'&loc=&prof=&profAr=YRKESOMRADE_ROLL:';

    switch(profession)
    {
      case 1:
          url += '1:Administration,%20ekonomi,%20juridik';
          break;
      case 2:
          url += '2:Bygg%20och%20anläggning';
          break;
      case 3:
          url += '3:Data%2FIT';
          break;
      case 4:
          url += '4:Kropps-%20och%20skönhetsvård';
          break;
      case 5:
          url += '5:Försäljning,%20inköp,%20marknadsföring';
          break;
      case 6:
          url += '6:Hantverksyrken';
          break;
      case 7:
          url += '7:Hotell,%20restaurang,%20storhushåll';
          break;
      case 8:
          url += '8:Hälso-%20och%20sjukvård';
          break;
      case 9:
          url += '9:Industriell%20tillverkning';
          break;
      case 10:
          url += '10:Installation,%20drift,%20underhåll';
          break;
      case 11:
          url += '11:Kultur,%20media,%20design';
          break;
      case 12:
          url += '12:Sanering%20och%20renhållning';
          break;
      case 13:
          url += '13:Naturbruk';
          break;
      case 14:
          url += '14:Naturvetenskapligt%20arbete';
          break;
      case 15:
          url += '15:Pedagogiskt%20arbete';
          break;
      case 16:
          url += '16:Socialt%20arbete';
          break;
      case 17:
          url += '17:Säkerhetsarbete';
          break;
      case 18:
          url += '18:Tekniskt%20arbete';
          break;
      case 19:
          url += '19:Transport';
          break;
      case 20:
          url += '20:Chefer%20och%20verksamhetsledare';
          break;
      case 22:
          url += '22:Militärt%20arbete';
          break;
    }

    return url;
  },
  jobPage: function (id) {
    return '/af/v1/matchning/matchandeRekryteringsbehov/'+id;
  }
};