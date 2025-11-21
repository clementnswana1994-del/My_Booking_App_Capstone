import Service from "../models/ServiceModel.js";

const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services) {
      res.status(400);
      throw new Error("services not found");
    }
    return res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// create service
const createService = async (req, res, next) => {
  try {
    // todo validate data from  user with joi
    const service = await Service.create(req.body);

    if (!service) {
      res.status(400);
      throw new Error("there was a problem creating");
    }
    const services = await Service.find();
    return res.status(201).json(services);
  } catch (error) {
    next(error);
  }
};

// get single service
const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(400);
      throw new Error("service not found");
    }

    return res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// update services
const updateServices = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedService) {
      res.status(400);
      throw new Error("cannot update service");
    }
    return res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};

const deleteServices = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(400);
      throw new Error("service not deleted");
    }

    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export default {
  getServices,
  createService,
  getService,
  updateServices,
  deleteServices,
};