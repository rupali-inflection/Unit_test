import { expect } from "chai";
import Application from "../src/app";
import { describe, it } from "mocha";
import request from "supertest";
import { getTestData, setTestData } from "./init";
import { response } from "express";
const infra = Application.instance();

describe("Student Test", function() {
  var agent = request.agent(infra._app);

  it("Create Student", function(done) {
    loadStudentCreateModel();
    const createModel = getTestData("StudentCreateModel");
    agent
    .post('/api/v1/student')
    .send(createModel)
    .expect(response => {
      setTestData(response.body.Data.id, "StudentId");
      // global.TestCache['StudentId'] = response.body.Data.id;
      expect(response.body.Data).to.have.property('name');
      expect(response.body.Data).to.have.property('age');

      setTestData(response.body.Data.id, "StudentId");
      expect(response.body.Data.name).to.equal(getTestData("StudentCreateModel").name);
      expect(response.body.Data.age).to.equal(getTestData("StudentCreateModel").age);

    })
    .expect(200, done)
  })

  it("Get Student by id", function(done) {
    agent
    .get(`/api/v1/student/${getTestData("StudentId")}`)
    .expect(response => {
      // setTestData(response.body.Data.id, "StudentId");
      // global.TestCache['StudentId'] = response.body.Data.id;
      expect(response.body.Data).to.have.property('id');
      expect(response.body.Data).to.have.property('name');
      expect(response.body.Data).to.have.property('age');

      // setTestData(response.body.Data.id, "StudentId");
      expect(response.body.Data.name).to.equal(getTestData("StudentCreateModel").name);
      expect(response.body.Data.age).to.equal(getTestData("StudentCreateModel").age);
    })
    .expect(200, done)
  })

  it("Update Student", function(done) {
    loadStudentUpdateModel()
    const updateModel = getTestData("StudentUpdateModel");
    agent
    .put(`/api/v1/student/${getTestData("StudentId")}`)
    .send(updateModel)
    .expect(response => {
      expect(response.body.Data).to.have.property('id');
      expect(response.body.Data).to.have.property('name');
      expect(response.body.Data).to.have.property('age');

      expect(response.body.Data.name).to.equal(getTestData("StudentUpdateModel").name);
      expect(response.body.Data.age).to.equal(getTestData("StudentUpdateModel").age);
    })
    .expect(200, done)
  })

  it("Delete Student", function(done) {
    agent
    .delete(`/api/v1/student/${getTestData("StudentId")}`)
    .expect(response => {
      expect(response.body).to.have.property('Status');
      expect(response.body.Status).to.equal('success');
    })
    .expect(200, done)
  })
})


function loadStudentCreateModel() {
  const model = {
    name: "Rahul",
    age: 22
  }
  // global.TestCache.StudentCreateModel = model 
  setTestData(model, "StudentCreateModel");
}

function loadStudentUpdateModel() {
  const model = {
    name: "Amit",
    age: 22
  }
  // global.TestCache.StudentCreateModel = model 
  setTestData(model, "StudentUpdateModel");
}