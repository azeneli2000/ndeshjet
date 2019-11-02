import { Component,OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { GetdataService } from '../getdata.service';
// import undefined = require('firebase/empty-import');
//import undefined = require('firebase/empty-import');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  
  ndeshjet = [];
  ndeshjetFilter = [];
  loaderToShow : any;
  dataNdeshje : string =new Date().toISOString();
  public searchTerm: string = "";
  constructor(public data : GetdataService, public loadingController: LoadingController) {}
  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Duke u karikuar....'
    }).then((res) => {
      res.present();
      
    
    });
  }

  hideLoader() {
   
      this.loadingController.dismiss();
   
  }
   compare( a, b ) {
    if ( a.totali > b.totali ){
      return -1;
    }
    if ( a.totali < b.totali ){
      return 1;
    }
    return 0;
  }

  getrezultatiWinner(rez : string) 
  {let rezArray = []
    if(rez!="" && rez != undefined)
    {
    rezArray= rez.split('-');
    if (Number(rezArray[0])+Number(rezArray[1]) >= 3)
     return("green");
     else return "red"
    }
    return "black"
  }
  
  
  dataChange()
  {this.showLoader();

    this.ndeshjet  = [];
    let dataFormat = this.dataNdeshje.substring(8,10)+ '-' + this.dataNdeshje.substring(5,7)+ '-' + this.dataNdeshje.substring(0,4);
    this.data.getNdeshjet(dataFormat).subscribe(res =>{
      res.forEach(element => {  
        var item = {
        id : 'https://www.flashscore.com/match/' +  element.payload.doc.id + '/#match-summary',
        totali : (element.payload.doc.data().BereAway + element.payload.doc.data().NgreneAway +element.payload.doc.data().BereHome + element.payload.doc.data().NgreneHome),
        home :  element.payload.doc.data().Pritesi,
        away : element.payload.doc.data().Udhetuesi,
        rezultati :  element.payload.doc.data().Rezultati,
        kampionati : element.payload.doc.data().Kampionati

      }
      if ((element.payload.doc.data().BereAway >= 5 && element.payload.doc.data().BereHome >= 5 && element.payload.doc.data().NgreneAway >= 5 && element.payload.doc.data().NgreneHome >=5)||( element.payload.doc.data().BereAway < 5 &&  element.payload.doc.data().BereHome < 5 &&  element.payload.doc.data().NgreneAway < 5 &&  element.payload.doc.data().NgreneHome < 5 &&  item.totali != 0))
        this.ndeshjet.push(item)
      })
          this.ndeshjet.sort(this.compare);
          this.hideLoader();
          this.ndeshjetFilter = this.ndeshjet;


      });

  }
  // setFilteredItems() {
  //   this.ndeshjet = this.ndeshjet.filterItems(this.searchTerm);
  // }

  filterItems() {
   
    if(this.searchTerm!="")
    this.ndeshjetFilter =  this.ndeshjet.filter(item => {
      
      let away : string = item.away.toLowerCase();
      let home : string = item.home.toLowerCase();
      let kamp : string = ""
      if ( item.kampionati==undefined)
      kamp = "?"
      else
      kamp = item.kampionati.toLowerCase();
      return away.indexOf(this.searchTerm.toLowerCase()) > -1||home.indexOf(this.searchTerm.toLowerCase()) > -1 || kamp.indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    else this.ndeshjetFilter = this.ndeshjet;
    
  }

   groupBy (xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  ngOnInit() {
    this.showLoader();
    this.ndeshjet = [];
    let dataFormat1 = this.dataNdeshje.substring(8,10)+ '-' + this.dataNdeshje.substring(5,7)+ '-' + this.dataNdeshje.substring(0,4);

    this.data.getNdeshjet(dataFormat1).subscribe(res =>{
  res.forEach(element => {  
    var item = {
    id : 'https://www.flashscore.com/match/' +  element.payload.doc.id + '/#match-summary',
    totali : (element.payload.doc.data().BereAway + element.payload.doc.data().NgreneAway +element.payload.doc.data().BereHome + element.payload.doc.data().NgreneHome),
    home :  element.payload.doc.data().Pritesi,
    away : element.payload.doc.data().Udhetuesi,
    rezultati :  element.payload.doc.data().Rezultati,
    kampionati : element.payload.doc.data().Kampionati

  }
  if ((element.payload.doc.data().BereAway >= 5 && element.payload.doc.data().BereHome >= 5 && element.payload.doc.data().NgreneAway >= 5 && element.payload.doc.data().NgreneHome >=5)||( element.payload.doc.data().BereAway < 5 &&  element.payload.doc.data().BereHome < 5 &&  element.payload.doc.data().NgreneAway < 5 &&  element.payload.doc.data().NgreneHome < 5 &&  item.totali != 0))
    this.ndeshjet.push(item)
  })
      this.ndeshjet.sort(this.compare);
      this.hideLoader();
this.ndeshjetFilter = this.ndeshjet;

    });
  }


}
