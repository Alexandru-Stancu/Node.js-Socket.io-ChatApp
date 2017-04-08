const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mihai',
            room: 'Bla1'
        }, {
            id: '2',
            name: 'Dan',
            room: 'Bla2'

        }, {
            id: '3',
            name: 'Alex',
            room: 'Bla1'
        }];
    });
    
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'alex',
            room: 'the office'
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userToBeRemoved = users.removeUser('1');

        expect(userToBeRemoved.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userToNotBeRemoved = users.removeUser('32');

        expect(userToNotBeRemoved).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var getUser = users.getUser('1');

        expect(getUser.id).toBe('1');
    });

    it('should not find user', () => {
        var dontGetUser = users.getUser('23');

        expect(dontGetUser).toNotExist();
    });

    it('should return names for bla1 room', () => {
        var userList = users.getUserList('Bla1');

        expect(userList).toEqual(['Mihai', 'Alex']);
    });

    it('should return names for bla1 room', () => {
        var userList = users.getUserList('Bla2');

        expect(userList).toEqual(['Dan']);
    });
});