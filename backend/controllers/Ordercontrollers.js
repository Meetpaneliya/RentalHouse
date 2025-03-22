import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/errorHandler";

export const createRoomOrder = TryCatch(async (req, res, next) => {
  const { buyer, owner, listing, paymentReference, paymentMethod } = req.body;

  // Validate required fields
  if (!buyer || !owner || !listing || !paymentReference || !paymentMethod) {
    return next(new ErrorHandler(400, "All required fields must be provided."));
  }

  // Create the order
  const order = await RoomOrder.create({
    buyer,
    owner,
    listing,
    paymentReference,
    paymentMethod,
    paid: true, // Assume payment is processed successfully
    paidAt: new Date(),
    orderStatus: "pending", // initial status can be 'pending'
  });

  res.status(201).json({
    success: true,
    message: "Room order created successfully.",
    order,
  });
});

// Controller: Get a single Room Order by ID
export const getRoomOrderById = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await RoomOrder.findById(id)
    .populate("buyer", "name email") // adjust the fields as needed
    .populate("owner", "name email")
    .populate("listing");

  if (!order) {
    return next(new ErrorHandler(404, "Room order not found."));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Controller: Update Room Order Status
export const updateRoomOrderStatus = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  // Allowed status values, can adjust as needed
  const allowedStatuses = ["pending", "completed", "canceled"];
  if (!allowedStatuses.includes(status)) {
    return next(new ErrorHandler(400, "Invalid order status."));
  }

  const order = await RoomOrder.findByIdAndUpdate(
    id,
    { orderStatus: status, updatedAt: new Date() },
    { new: true }
  );

  if (!order) {
    return next(new ErrorHandler(404, "Room order not found."));
  }

  res.status(200).json({
    success: true,
    message: "Room order status updated successfully.",
    order,
  });
});

// Controller: Get all Room Orders for a specific buyer
export const getUserRoomOrders = TryCatch(async (req, res, next) => {
  const { buyerId } = req.params;

  const orders = await RoomOrder.find({ buyer: buyerId })
    .populate("listing")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
});
