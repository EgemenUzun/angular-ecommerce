import { OrderHistory } from './order-history';

describe('OrderHistory', () => {
  it('should create an instance', () => {
    expect(new OrderHistory('','',1,1,new Date())).toBeTruthy();
  });
});
