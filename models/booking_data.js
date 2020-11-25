module.exports = (sequelize, Sequelize) => {
  const BookingData = sequelize.define(
    "booking_data",
    {
      id: {
        type: Sequelize.STRING,
        field: "id",
        primaryKey: true,
      },
      roomId: {
        type: Sequelize.STRING,
        field: "roomId",
      },
      startTime: {
        type: Sequelize.DATE,
        field: "startTime",
      },
      endTime: {
        type: Sequelize.DATE,
        field: "endTime",
      },
      title: {
        type: Sequelize.STRING,
        field: "title",
      },
    },
    {
      timestamps: false,
    }
  );
  return BookingData;
};
