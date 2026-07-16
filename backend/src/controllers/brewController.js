import { Op } from 'sequelize';
import { Brew } from '../../models/Brew.js';

const requiredFields = [
  'coffeeName',
  'brewMethod',
  'coffeeWeight',
  'waterAmount',
  'brewTime',
  'rating',
  'notes',
];

function getValidationErrors(body) {
  const errors = {};

  for (const field of requiredFields) {
    const value = body[field];
    if (value === undefined || value === null || String(value).trim() === '') {
      errors[field] = `${field} is required`;
    }
  }

  if (body.coffeeWeight !== undefined && Number(body.coffeeWeight) <= 0) {
    errors.coffeeWeight = 'Coffee weight must be greater than zero';
  }
  if (body.waterAmount !== undefined && Number(body.waterAmount) <= 0) {
    errors.waterAmount = 'Water amount must be greater than zero';
  }
  if (body.brewTime !== undefined && Number(body.brewTime) <= 0) {
    errors.brewTime = 'Brew time must be greater than zero';
  }
  if (body.rating !== undefined) {
    const rating = Number(body.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      errors.rating = 'Rating must be a whole number from 1 to 5';
    }
  }

  return errors;
}

function normalizePayload(body) {
  return {
    coffeeName: String(body.coffeeName).trim(),
    brewMethod: String(body.brewMethod).trim(),
    coffeeWeight: Number(body.coffeeWeight),
    waterAmount: Number(body.waterAmount),
    brewTime: Number(body.brewTime),
    rating: Number(body.rating),
    notes: String(body.notes).trim(),
  };
}

export async function listBrews(req, res, next) {
  try {
    const { brewMethod } = req.query;
    const where = brewMethod
      ? { brewMethod: { [Op.like]: `%${String(brewMethod).trim()}%` } }
      : undefined;

    const brews = await Brew.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.status(200).json(brews);
  } catch (error) {
    return next(error);
  }
}

export async function getBrew(req, res, next) {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) return res.status(404).json({ message: 'Brew not found' });
    return res.status(200).json(brew);
  } catch (error) {
    return next(error);
  }
}

export async function createBrew(req, res, next) {
  try {
    const errors = getValidationErrors(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const brew = await Brew.create(normalizePayload(req.body));
    return res.status(201).json(brew);
  } catch (error) {
    return next(error);
  }
}

export async function updateBrew(req, res, next) {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) return res.status(404).json({ message: 'Brew not found' });

    const errors = getValidationErrors(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    await brew.update(normalizePayload(req.body));
    return res.status(200).json(brew);
  } catch (error) {
    return next(error);
  }
}

export async function deleteBrew(req, res, next) {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) return res.status(404).json({ message: 'Brew not found' });

    await brew.destroy();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
