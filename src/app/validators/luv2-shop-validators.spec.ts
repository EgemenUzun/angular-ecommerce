import { FormControl } from '@angular/forms';
import { Luv2ShopValidators } from './luv2-shop-validators';

fdescribe('Luv2ShopValidators', () => {
  it('should create an instance', () => {
    expect(new Luv2ShopValidators()).toBeTruthy();
  });
  it('should return null for non-empty string', () => {
    const control = new FormControl('Hello');
    const result = Luv2ShopValidators.notOnlyWhitespace(control);

    expect(result).toBeNull();
  });

  it('should return null for non-empty string with leading/trailing spaces', () => {
    const control = new FormControl('   Hello   ');
    const result = Luv2ShopValidators.notOnlyWhitespace(control);

    expect(result).toBeNull();
  });

  it('should return an error object for a string with only whitespace', () => {
    const control = new FormControl('    ');
    const result = Luv2ShopValidators.notOnlyWhitespace(control);

    expect(result).toEqual({ notOnlyWhitespace: true });
  });

  it('should return an error object for a string with only whitespace characters', () => {
    const control = new FormControl('\t\n\r ');
    const result = Luv2ShopValidators.notOnlyWhitespace(control);

    expect(result).toEqual({ notOnlyWhitespace: true });
  });

  it('should return null for a null control value', () => {
    const control = new FormControl(null);
    const result = Luv2ShopValidators.notOnlyWhitespace(control);

    expect(result).toBeNull();
  });

  it('should return null for an undefined control value', () => {
    const control = new FormControl(undefined);
    const result = Luv2ShopValidators.notOnlyWhitespace(control);

    expect(result).toBeNull();
  });
});
