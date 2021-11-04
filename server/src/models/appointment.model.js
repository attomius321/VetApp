module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            animal: String,
            unix: Number,
            doc: String,
            diagnostic: String,
            status: String
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Appointment = mongoose.model("appointments", schema);
      return Appointment;
  };