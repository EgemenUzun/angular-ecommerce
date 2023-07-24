import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: OrderHistory[] = [];
  storage :Storage = localStorage;
  constructor(private orderHistoryService:OrderHistoryService){}
  
  ngOnInit(): void {
    this.handleOrderHistory();
  }
  handleOrderHistory() {
    // read the user's email from storage
    const username = (this.storage.getItem('username')!);
    //retrieve data from the service
    this.orderHistoryService.getOrderHistory(username).subscribe(
      data => {
        this.orderHistoryList = data;
      }
    );
  }

}
