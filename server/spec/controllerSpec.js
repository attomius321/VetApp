var request = require("request");

base_url = "http://localhost:8080/"

let id = 0;
let id2 = 0;

describe("Vet App Server", function() {
    describe("GET /", function() {
        it("should return status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("should create an appointment", function(done) {
            request.post("http://localhost:8080/api/appointments", {json: {animal: "Maimuta", doc: "Dr. Nicky"}}, function(error, response, body) {
                id = body.id;
                expect(body.animal).toBe("Maimuta");
                done();
            })
        })

        it("should not create appointment", function(done) {
            request.post("http://localhost:8080/api/appointments", {json: { doc: "Dr. Nicky"}}, function(error, response, body) {
                expect(body.message).toBe("Should have at least name");
                done();
            })
        })

        it("should return appointment by id", function(done) {
            request.get("http://localhost:8080/api/appointments/" + id, function(error, response, body) {
                expect(body).toContain('"animal":"Maimuta"');
                done();
            })
        })

        it("should create an appointment", function(done) {
            request.post("http://localhost:8080/api/appointments", {json: {animal: "Babuin", doc: "Dr. Nicky Heis"}}, function(error, response, body) {
                id2 = body.id;
                expect(body.animal).toBe("Babuin");
                done();
            })
        })

        it("should return array of appointments", function(done) {
            request.get("http://localhost:8080/api/appointments", function(error, response, body) {
                expect(JSON.parse(body)[0].animal).toBe("Maimuta");
                expect(JSON.parse(body)[1].animal).toBe("Babuin");
                done();
            })
        })

        it("should delete specific appointment by id", function(done) {
            request.delete("http://localhost:8080/api/appointments/" + id2, function(error, response ,body) {
                expect(JSON.parse(body).message).toBe("Appointment was deleted successfully!");
                done();
            })
        })

        it("should not return appointment by id", function(done) {
            request.get("http://localhost:8080/api/appointments/" + id2, function(error, response, body) {
                expect(JSON.parse(body).message).toBe("Not found Appointment with id "+id2);
                done();
            })
        })

        it("should update appointment", function(done) {
            request.put("http://localhost:8080/api/appointments/" + id, {json: {animal: "Pisica"}}, function(error, response, body) {
                expect(body.message).toBe("Appointment was updated successfully.");
                done();
            })
        })

        it("should delete all appointments", function(done) {
            request.delete("http://localhost:8080/api/appointments", function(error, response, body) {
                expect(body).toBe(JSON.stringify({"message":"Appointments deleted!"}));
                done();
            })
        })

    });
  });