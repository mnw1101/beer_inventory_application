// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// interface Person {
//   name: string;
//   role: string;
// }

// @Component({
//   selector: 'app-apartment-selection',
//   templateUrl: './apartment-selection.component.html',
//   styleUrls: ['./apartment-selection.component.css']
// })
// export class ApartmentSelectionComponent implements OnInit {
//   apartment: string | null = '';
//   people: { name: string, role: string }[] = [];
//   newPersonName: string = '';
//   newPersonRole: string = '';
//   editingPerson: Person | null = null;
//   editingPersonIndex: number | null = null;
//   storageCapacity: number = 0;
//   criticalMass: number = 0;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.apartment = this.route.snapshot.paramMap.get('id');
//     this.loadPeople();
//     const config = JSON.parse(localStorage.getItem(this.apartment!) || '{}');
//     this.storageCapacity = config.storageCapacity || 0;
//     this.criticalMass = config.criticalMass || 0;
//   }

//   loadPeople() {
//     const storedPeople = localStorage.getItem(this.apartment!);
//     if (storedPeople) {
//       this.people = JSON.parse(storedPeople);
//     }
//   }

//   savePeople() {
//     localStorage.setItem(this.apartment!, JSON.stringify(this.people));
//   }

//   addPerson() {
//     const newPerson: Person = {
//       name: this.newPersonName,
//       role: this.newPersonRole
//     };
//     this.people.push(newPerson);
//     this.savePeople();
//     this.newPersonName = '';
//     this.newPersonRole = '';
//   }

//   editPerson(index: number) {
//     this.editingPersonIndex = index;
//     this.editingPerson = { ...this.people[index] };
//   }

//   saveEdit() {
//     if (this.editingPersonIndex !== null && this.editingPerson) {
//       this.people[this.editingPersonIndex] = this.editingPerson;
//       this.savePeople();
//       this.editingPerson = null;
//       this.editingPersonIndex = null;
//     }
//   }

//   deletePerson(index: number) {
//     this.people.splice(index, 1);
//     this.savePeople();
//   }

//   saveConfig() {
//     const config = {
//       storageCapacity: this.storageCapacity,
//       criticalMass: this.criticalMass
//     };
//     // Save storage capacity and critical mass to localStorage
//     localStorage.setItem(this.apartment!, JSON.stringify(config));
//     alert('Configuration saved successfully!');
//   }

//   goBack() {
//     this.router.navigate(['/apartment-overview']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Person {
  name: string;
  role: string;
  // beerBought: any;
  // beerConsumed: any;
}

interface Price {
  euro: number;
}

@Component({
  selector: 'app-apartment-selection',
  templateUrl: './apartment-selection.component.html',
  styleUrls: ['./apartment-selection.component.css']
})

export class ApartmentSelectionComponent implements OnInit {
  apartment: string | null = '';
  people: Person[] = [];
  newPersonName: string = '';
  newPersonRole: string = '';
  editingPerson: Person | null = null;
  editingPersonIndex: number | null = null;

  storageCapacity: number = 0;
  criticalMass: number = 0;

  beerBought: Person[] = [];
  beerConsumed: Person[] = [];

  showPersonWhoBought: string[] = [this.newPersonName];
  dataWhoBought: Person[] = [];

  showPersonWhoConsumed: string[] = [this.newPersonName];
  dataWhoConsumed: Person[] = [];

  price: number = 0;
  totalPrice: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {
    this.apartment = this.route.snapshot.paramMap.get('id');
    this.loadPeople();

    const config = JSON.parse(localStorage.getItem(this.apartment!) || '{}');
    this.storageCapacity = config.storageCapacity || 0;
    this.criticalMass = config.criticalMass || 0;
  }

  loadPeople() {
    const storedPeople = localStorage.getItem(this.apartment!);
    if (storedPeople) {
      this.people = JSON.parse(storedPeople);
    }
  }

  savePeople() {
    localStorage.setItem(this.apartment!, JSON.stringify(this.people));
  }

  addPerson() {
    const newPerson: Person = {
      name: this.newPersonName,
      role: this.newPersonRole
    };
    this.people.push(newPerson);
    this.savePeople();
    this.newPersonName = '';
    this.newPersonRole = '';
  }

  editPerson(index: number) {
    this.editingPersonIndex = index;
    this.editingPerson = { ...this.people[index] };
  }

  saveEdit() {
    if (this.editingPersonIndex !== null && this.editingPerson) {
      this.people[this.editingPersonIndex] = this.editingPerson;
      this.savePeople();
      this.editingPerson = null;
      this.editingPersonIndex = null;
    }
  }

  deletePerson(index: number) {
    this.people.splice(index, 1);
    this.savePeople();
  }

  saveConfig() {
    const config = {
      storageCapacity: this.storageCapacity,
      criticalMass: this.criticalMass
    };
    // Save storage capacity and critical mass to localStorage
    localStorage.setItem(this.apartment!, JSON.stringify(config));
    alert('Configuration saved successfully!');
  }

  // beerBought(): void {
  //   let tmpvar: Person[] = Array.from(this.people);
  //   this.beerBought = tmpvar.sort((n, m) => (n.beerBought > m.beerBought));
  //   this.dataWhoBought = this.beerBought;
  // }

  // beerConsumed(): void {
  //   let tmpvar: Person[] = Array.from(this.people);
  //   this.beerConsumed = tmpvar.sort((n, m) => (n.beerConsumed > m.beerConsumed));
  //   this.dataWhoConsumed = this.beerConsumed;
  // }

  addToPrice() {
    const addPrice: Price = {
      euro: this.price
    };
    this.price = 0;
  }

  // get totalPrice() {
  //   for(let i = 0; i < this.storageCapacity; i++) {
  //     this.totalPrice+=this.addToPrice;
  //   }
  //   return this.totalPrice;
  // }

  goBack() {
    this.router.navigate(['/apartment-overview']);
  }

}
