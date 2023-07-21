import { Role } from './role';
import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    const roles:Role[]=[{roleId:1,authority:''},]
    expect(new User('','','',roles)).toBeTruthy();
  });
});
