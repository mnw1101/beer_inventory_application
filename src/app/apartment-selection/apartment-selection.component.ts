import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Person {
  name: string;
  role?: string;
  quantity: number;
  price?: number;
  totalPrice?: number;
  age?: number;
  date?: Date;
  month?: string;
  totalQuantity?: number;
}

interface Price {
  euro: number;
}

type InventoryItem = {
  name: string;
  quantity: number;
  price: number;
};

@Component({
  selector: 'app-apartment-selection',
  templateUrl: './apartment-selection.component.html',
  styleUrls: ['./apartment-selection.component.css'],
})
export class ApartmentSelectionComponent implements OnInit {
  // Move newPerson inside the component class
  newPerson: Person = {
    name: 'Alice',
    role: 'Engineer',
    quantity: 0,
  };

  apartment: string | null = '';
  people: Person[] = [];
  newPersonName: string = '';
  newPersonRole: string = '';
  editingPerson: Person | null = null;
  editingPersonIndex: number | null = null;

  storageCapacity: number = 0;
  criticalMass: number = 0;

  showPersonWhoBought: string[] = [this.newPersonName];
  dataWhoBought: Person[] = [];
  beerBought: Person[] = [];

  showPersonWhoConsumed: string[] = [this.newPersonName];
  dataWhoConsumed: Person[] = [];
  beerConsumed: Person[] = [];

  price: number = 0;
  pricePerBottle: number = 0;
  totalPrice: number = 0;

  totalBudget: number = 0;

  budgetSaved: boolean = false;
  budgetSavedMessage: string = '';

  selectedPersonName: string = '';

  totalSpaceUsed: number = 0;

  items: InventoryItem[] = [];

  newPurchasePersonName: string = '';
  newPurchaseQuantity: number = 0;
  newPurchasePrice: number = 0;
  newPurchaseDate: Date = new Date();
  purchases: Person[] = [];
  monthlyPurchases: Person[] = [];
  totalPurchaseQuantity: number = 0;

  newConsumptionPersonName: string = '';
  newConsumptionQuantity: number = 0;
  newConsumptionDate: Date = new Date();
  consumption: Person[] = [];
  monthlyConsumption: Person[] = [];
  totalConsumptionQuantity: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  // Initializes the component when it is first loaded
  // Retrieves and sets the apartment ID from the route
  // Loads people data and configuration from local storage
  ngOnInit() {
    this.apartment = this.route.snapshot.paramMap.get('id');
    this.loadPeople();

    const config = JSON.parse(localStorage.getItem(this.apartment!) || '{}');

    this.storageCapacity = config.storageCapacity || 0;

    this.criticalMass = config.criticalMass || 0;

    this.calculateTotalSpaceUsed();
  }

  // Calculates the total space used by summing the quantities of all items
  // Updates the `totalSpaceUsed` property with the calculated value
  calculateTotalSpaceUsed() {
    this.totalSpaceUsed = this.calculateTotalQuantity();
  }

  // Calculates and returns the total quantity of all items
  calculateTotalQuantity(): number {
    let totalQuantity = 0;

    for (const item of this.items) {
      totalQuantity += item.quantity;
    }

    return totalQuantity;
  }

  // Loads people data from local storage and updates the `people` property
  loadPeople() {
    const storedPeople = localStorage.getItem(`peopleData-${this.apartment}`);
    if (storedPeople) {
      this.people = JSON.parse(storedPeople);
    }
  }

  // Saves the `people` data to local storage
  savePeople() {
    localStorage.setItem(
      `peopleData-${this.apartment}`,
      JSON.stringify(this.people)
    );
  }

  // Adds a new person to the `people` array with the provided name and role
  // Saves the updated `people` data to local storage
  // Resets the `newPersonName` and `newPersonRole` properties
  addPerson() {
    const newPerson: Person = {
      name: this.newPersonName,
      role: this.newPersonRole,
      quantity: 0,
    };

    this.people.push(newPerson);

    this.savePeople();

    this.newPersonName = '';

    this.newPersonRole = '';
  }

  // Sets the `editingPerson` and `editingPersonIndex` properties based on the provided index
  // Sets the `selectedPersonName` to the name of the person being edited
  editPerson(index: number) {
    this.editingPersonIndex = index;

    this.editingPerson = { ...this.people[index] };

    this.selectedPersonName = this.people[index].name;
  }

  // Saves the edited person's data to the `people` array
  // Saves the updated `people` data to local storage
  // Resets the `editingPerson`, `editingPersonIndex`, and `selectedPersonName` properties
  saveEdit() {
    if (this.editingPersonIndex !== null && this.editingPerson) {
      this.people[this.editingPersonIndex] = this.editingPerson;

      this.savePeople();

      this.editingPerson = null;

      this.editingPersonIndex = null;

      this.selectedPersonName = '';
    }
  }

  // Deletes a person from the `people` array based on the provided index
  // Saves the updated `people` data to local storage
  deletePerson(index: number) {
    this.people.splice(index, 1);

    this.savePeople();
  }

  // Saves the storage capacity and critical mass configuration to local storage
  // Displays an alert to indicate the successful saving of the configuration
  saveConfig() {
    const config = {
      storageCapacity: this.storageCapacity,
      criticalMass: this.criticalMass,
    };

    localStorage.setItem(this.apartment!, JSON.stringify(config));

    alert('Configuration saved successfully!');
  }

  // Adds the `pricePerBottle` value to the `totalPrice` property
  addToPrice() {
    this.totalPrice += this.pricePerBottle;
  }

  // Saves the total budget to local storage with the apartment ID as the key
  // Updates the `budgetSaved` and `budgetSavedMessage` properties based on the success of saving
  saveTotalBudget() {
    const budget = {
      totalBudget: this.totalBudget,
    };

    try {
      localStorage.setItem(`${this.apartment}-budget`, JSON.stringify(budget));

      this.budgetSaved = true;

      this.budgetSavedMessage = 'Successfully saved';
    } catch (error) {
      this.budgetSaved = false;

      this.budgetSavedMessage = 'Not successfully saved';
    }
  }

  // Sets the `newConsumptionPersonName`, `newConsumptionQuantity`, and `newConsumptionDate` properties
  // Removes the consumption entry from the `consumption` array based on the provided index
  editConsumption(index: number): void {
    this.newConsumptionPersonName = this.consumption[index].name;

    this.newConsumptionQuantity = this.consumption[index].quantity || 0;

    this.newConsumptionDate = new Date();

    this.consumption.splice(index, 1);
  }

  // Deletes a consumption entry from the `consumption` array based on the provided index
  deleteConsumption(index: number): void {
    this.consumption.splice(index, 1);
  }

  // Adds a consumption entry to the `beerConsumed` array
  // Resets the `newConsumptionPersonName` and `newConsumptionQuantity` properties
  addConsumption(consumption: Person) {
    this.beerConsumed.push(consumption);

    this.newConsumptionPersonName = '';

    this.newConsumptionQuantity = 0;
  }

  // Saves the consumption data to the `consumption` array
  // Updates the `totalSpaceUsed`, `newConsumptionPersonName`, `newConsumptionQuantity`, `newConsumptionDate`, and `totalConsumptionQuantity` properties
  saveConsumption(consumptionData: Person) {
    const consumption: Person = {
      name: consumptionData.name,
      quantity: consumptionData.quantity,
      date: this.newConsumptionDate,
      month: this.getMonth(),
    };

    consumption.totalQuantity = consumption.quantity;

    this.consumption.push(consumption);

    this.totalSpaceUsed -= consumption.quantity;

    this.newConsumptionPersonName = '';

    this.newConsumptionQuantity = 0;

    this.newConsumptionDate = new Date();

    this.totalConsumptionQuantity = this.consumption.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Logs the monthly consumption data to the console
  // Sorts the `consumption` array by quantity in descending order
  showMonthlyConsumption(): void {
    console.log('Monthly Consumption:');

    this.consumption.sort((a, b) => b.quantity - a.quantity);

    for (const consumption of this.consumption) {
      const price = consumption.price ?? 0;

      console.log(`Product: ${consumption.name}`);

      console.log(`Quantity: ${consumption.quantity}`);

      console.log(`Price: ${price}`);

      console.log('==============================');
    }
  }

  // Sets the `newPurchasePersonName`, `newPurchaseQuantity`, and `newPurchasePrice` properties
  // Removes the purchase entry from the `purchases` array based on the provided index
  editPurchase(index: number) {
    this.newPurchasePersonName = this.purchases[index].name;

    this.newPurchaseQuantity = this.purchases[index].quantity || 0;

    this.newPurchasePrice = this.purchases[index].price || 0;

    this.purchases.splice(index, 1);
  }

  // Deletes a purchase entry from the `purchases` array based on the provided index
  deletePurchase(index: number) {
    this.purchases.splice(index, 1);
  }

  // Saves the purchase data to the `purchases` array
  // Updates the `totalSpaceUsed`, `totalPrice`, `newPurchasePersonName`, `newPurchaseQuantity`, `newPurchasePrice`, `newPurchaseDate`, `totalBudget`, `monthlyPurchases`, and `totalConsumptionQuantity` properties
  savePurchase() {
    const purchase: Person = {
      name: this.newPurchasePersonName,

      quantity: this.newPurchaseQuantity,

      price: this.newPurchasePrice,

      date: this.newPurchaseDate,

      month: this.getMonth(),
    };

    const price = purchase.price ?? 0;

    purchase.totalPrice = purchase.quantity * price;

    this.purchases.push(purchase);

    this.totalSpaceUsed += purchase.quantity;

    if (purchase.price !== undefined) {
      this.totalPrice += purchase.quantity * purchase.price;
    }

    this.newPurchasePersonName = '';

    this.newPurchaseQuantity = 0;

    this.newPurchasePrice = 0;

    this.newPurchaseDate = new Date();

    this.totalBudget -= purchase.totalPrice;

    const totalQuantity = this.calculateTotalPurchaseQuantity();

    const monthlyPurchase: Person = {
      name: 'All Quantity',
      quantity: totalQuantity,
    };

    const existingMonthlyPurchaseIndex = this.monthlyPurchases.findIndex(
      (purchase) => purchase.name === 'All Quantity'
    );

    if (existingMonthlyPurchaseIndex !== -1) {
      this.monthlyPurchases[existingMonthlyPurchaseIndex] = monthlyPurchase;
    } else {
      this.monthlyPurchases.push(monthlyPurchase);
    }

    this.totalConsumptionQuantity = this.consumption.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Filters the `purchases` array to get the monthly purchases
  // Sorts the monthly purchases by quantity in descending order
  // Updates the `monthlyPurchases` property with the filtered and sorted data
  showMonthlyPurchases() {
    this.monthlyPurchases = this.purchases
      .filter((purchase) => purchase.month === this.getMonth())
      .sort((a, b) => b.quantity - a.quantity);
  }

  // Calculates and returns the number of bottles left based on the storage capacity, total purchase quantity, and total consumption quantity
  getBottlesLeft(): number {
    let totalPurchaseQuantity = 0;

    let totalConsumptionQuantity = 0;

    for (const purchase of this.purchases) {
      totalPurchaseQuantity += purchase.quantity;
    }

    for (const consumption of this.consumption) {
      totalConsumptionQuantity += consumption.quantity;
    }

    const bottlesLeft =
      this.storageCapacity + totalPurchaseQuantity - totalConsumptionQuantity;

    return bottlesLeft;
  }

  // Calculates and returns the total purchase quantity from the `purchases` array
  calculateTotalPurchaseQuantity(): number {
    let totalQuantity = 0;

    for (const purchase of this.purchases) {
      totalQuantity += purchase.quantity;
    }

    return totalQuantity;
  }

  // Calculates and returns the total purchase quantity from the `monthlyPurchases` array
  getTotalPurchaseQuantity(): number {
    let totalQuantity = 0;

    for (const purchase of this.monthlyPurchases) {
      totalQuantity += purchase.quantity;
    }

    return totalQuantity;
  }

  // Returns the current month as a string
  getMonth(): string {
    const currentDate = new Date();

    const month = currentDate.toLocaleString('default', { month: 'long' });

    return month;
  }

  // Calculates and returns the total consumption quantity from the `monthlyConsumption` array
  getTotalConsumptionQuantity(): number {
    let totalQuantity = 0;

    for (const consumption of this.monthlyConsumption) {
      totalQuantity += consumption.quantity;
    }

    return totalQuantity;
  }

  // Finds and returns the name of the person with the highest purchase quantity
  getShoppingQueenKingName(): string {
    let highestQuantity = 0;

    let shoppingQueenKingName = '';

    for (const purchase of this.purchases) {
      if (purchase.quantity > highestQuantity) {
        highestQuantity = purchase.quantity;
        shoppingQueenKingName = purchase.name;
      }
    }

    return shoppingQueenKingName;
  }

  // Finds and returns the name of the person with the highest consumption quantity
  getBeerQueenKingName(): string {
    let highestQuantity = 0;

    let beerQueenKingName = '';

    for (const consumption of this.consumption) {
      if (consumption.quantity > highestQuantity) {
        highestQuantity = consumption.quantity;
        beerQueenKingName = consumption.name;
      }
    }

    return beerQueenKingName;
  }

  // Navigates back to the apartment overview page
  goBack() {
    this.router.navigate(['/apartment-overview']);
  }
}
