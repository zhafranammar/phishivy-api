import { Sequelize } from "sequelize";
import PhishingData from "../models/PhishingData.js";

export const findPhishingByUrl = async (url) => {
  try {
    const record = await PhishingData.findOne({ where: { url } });
    return record ? record.toJSON() : null;
  } catch (error) {
    console.error("Error finding phishing data:", error);
    throw error;
  }
};

export const addPhishing = async (data) => {
  try {
    const phishingEntry = await PhishingData.create(data);
    return phishingEntry;
  } catch (error) {
    console.error("Error adding phishing data:", error);
  }
};

export const findTotalUrl = async () => {
  try {
    // Menghitung total URL
    const totalUrl = await PhishingData.count();
    return totalUrl;
  } catch (error) {
    console.error("Error counting total URLs:", error);
    throw error;
  }
};

export const findSumOfCheck = async () => {
  try {
    const sumCheck = await PhishingData.sum('check_by_user');
    const result = sumCheck;
    return result;
  } catch (error) {
    console.error("Error summing check_by_user:", error);
    throw error;
  }
};

export const CheckToUrl = async (url) => {
  try {
    const record = await PhishingData.findOne({ where: { url } });

    if (!record) {
      return false;
    }

    record.check_by_user++;

    await record.save();

    return true;
  } catch (error) {
    console.error("Error updating phishing data:", error);
    return false;
  }
};

