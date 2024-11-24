const express = require('express');
const app = express();
const cors = require('cors');
const {
  getEmployeeById,
  getAllEmployees,
} = require('../BD6.6_CW/controllers/index');
app.use(cors());
app.use(express.json());

//Endpoint of all employees
app.get('/employees', async (req, res) => {
  const employees = await getAllEmployees();
  return res.json({ employees });
});

//Employee of particular Id
app.get('/employees/details/:id', async (req, res) => {
  const employee = await getEmployeeById(parseInt(req.params.id));
  return res.json({ employee });
});

module.exports = {
  app,
};
