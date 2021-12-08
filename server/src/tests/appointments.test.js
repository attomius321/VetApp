const appointmentsController = require("../controllers/appointment.controller.js");

test('should create an appointment', () => {
    const appointment= {
        body: {
            animal: "Caine",
            unix: 4,
            doc: "Doc. Sting",
            diagnostic: "Scoate limba la frig",
            status: "CONFIRMED"
        }
    }
    expect(appointmentsController.create(appointment)).toBe( {
        animal: "Caine",
        unix: 4,
        doc: "Doc. Sting",
        diagnostic: "Scoate limba la frig",
        status: "CONFIRMED"
    })
});