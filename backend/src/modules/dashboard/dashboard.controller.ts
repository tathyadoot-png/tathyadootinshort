import { Request, Response } from "express";
import * as dashboardService from "./dashboard.service";

export const getDashboardStats = async (
  _req: Request,
  res: Response
) => {
  try {
    const stats =
      await dashboardService.getDashboardStats();

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard stats",
      error,
    });
  }
};