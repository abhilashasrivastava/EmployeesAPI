const request = require('supertest');
const http = require('http');
const { app } = require('../index.js');
const { getAllEmployees, getEmployeeById } = require('../controllers');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller Functions Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return a list of employees:', () => {
    const mockedEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];
    getAllEmployees.mockReturnValue(mockedEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3);
  });

  test('should return Employee details:', () => {
    const mockEmployee = {
      employee: {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    };
    getEmployeeById.mockReturnValue(mockEmployee);
    let result = getEmployeeById(3);
    expect(result).toEqual(mockEmployee);
  });
});

describe('API Endpoint Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /employees should get all employees', async () => {
    const mockedEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];
    getAllEmployees.mockResolvedValue(mockedEmployees);

    const result = await request(server).get('/employees');
    expect(result.status).toBe(200);
    expect(result.body.employees).toEqual(mockedEmployees);
    expect(result.body.employees.length).toBe(3);
  });

  it('GET /employees/details/:id should get an employee by its ID', async () => {
    const mockEmployee = {
      employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,
    };
    getEmployeeById.mockResolvedValue(mockEmployee);

    const result = await request(server).get('/employees/details/1');
    expect(result.status).toBe(200);
    expect(result.body.employee).toEqual(mockEmployee);
  });
});
