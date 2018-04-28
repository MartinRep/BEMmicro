import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-entity',
  templateUrl: 'entity.html'
})
export class EntityPage {

  entities: Array<any> = [
      {name: 'Profile', component: 'ProfilePage'},
      {name: 'Location', component: 'LocationPage'},
      {name: 'Appointment', component: 'AppointmentPage'},
      {name: 'Category', component: 'CategoryPage'},
      {name: 'Message', component: 'MessagePage'},
      {name: 'Request', component: 'RequestPage'},
      {name: 'Offer', component: 'OfferPage'},
      {name: 'LastMinuteOffer', component: 'LastMinuteOfferPage'},
      {name: 'LastMinuteService', component: 'LastMinuteServicePage'},
      /* jhipster-needle-add-entity-page - JHipster will add entity pages here */
  ];

  constructor(public nav: NavController) { }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  ionViewWillLoad() {
    let page = location.hash.substring(location.hash.lastIndexOf('/') + 1);
    let urlParts = location.hash.split('/');
    page = page.charAt(0).toUpperCase() + page.substring(1) + 'Page';
    let destination;
    this.entities.forEach(entity => {
      if (entity.component === page) {
        destination = entity.component;
      }
    });
    if (destination) {
      this.nav.push(destination);
    } else if (urlParts.length === 5) {
      // convert from URL to page name: foo-detail to FooDetailPage
      const detailPage = this.urlToTitleCase(urlParts[3]) + 'Page';
      this.nav.push(detailPage, {id: urlParts[4]})
    }
  }

  private urlToTitleCase(str) {
    return str.replace(/(-|^)([^-]?)/g, (_, prep, letter) => {
      return (prep && '') + letter.toUpperCase();
    });
  }
}
