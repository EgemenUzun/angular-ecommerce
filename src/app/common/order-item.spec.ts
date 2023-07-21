import { OrderItem } from './order-item';

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(new OrderItem('',1,1,'')).toBeTruthy();
  });
});
