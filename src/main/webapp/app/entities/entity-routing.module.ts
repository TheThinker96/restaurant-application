import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'entreprise-chad',
        data: { pageTitle: 'restaurantApplicationApp.entreprise.home.title' },
        loadChildren: () => import('./entreprise-chad/entreprise-chad.module').then(m => m.EntrepriseChadModule),
      },
      {
        path: 'point-of-sale-chad',
        data: { pageTitle: 'restaurantApplicationApp.pointOfSale.home.title' },
        loadChildren: () => import('./point-of-sale-chad/point-of-sale-chad.module').then(m => m.PointOfSaleChadModule),
      },
      {
        path: 'section-chad',
        data: { pageTitle: 'restaurantApplicationApp.section.home.title' },
        loadChildren: () => import('./section-chad/section-chad.module').then(m => m.SectionChadModule),
      },
      {
        path: 'produit-chad',
        data: { pageTitle: 'restaurantApplicationApp.produit.home.title' },
        loadChildren: () => import('./produit-chad/produit-chad.module').then(m => m.ProduitChadModule),
      },
      {
        path: 'user-account-chad',
        data: { pageTitle: 'restaurantApplicationApp.userAccount.home.title' },
        loadChildren: () => import('./user-account-chad/user-account-chad.module').then(m => m.UserAccountChadModule),
      },
      {
        path: 'stock-produit-chad',
        data: { pageTitle: 'restaurantApplicationApp.stockProduit.home.title' },
        loadChildren: () => import('./stock-produit-chad/stock-produit-chad.module').then(m => m.StockProduitChadModule),
      },
      {
        path: 'vente-produit-chad',
        data: { pageTitle: 'restaurantApplicationApp.venteProduit.home.title' },
        loadChildren: () => import('./vente-produit-chad/vente-produit-chad.module').then(m => m.VenteProduitChadModule),
      },
      {
        path: 'client-chad',
        data: { pageTitle: 'restaurantApplicationApp.client.home.title' },
        loadChildren: () => import('./client-chad/client-chad.module').then(m => m.ClientChadModule),
      },
      {
        path: 'credit-chad',
        data: { pageTitle: 'restaurantApplicationApp.credit.home.title' },
        loadChildren: () => import('./credit-chad/credit-chad.module').then(m => m.CreditChadModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
