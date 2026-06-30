const Scan = require("../models/Scan");

exports.getDashboard = async (req, res) => {
  try {
    // Fetch all scans of the logged-in user
    const scans = await Scan.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    // Total scans
    const totalScans = scans.length;

    // Recyclable items
    const recyclableItems = scans.filter(
      (scan) => scan.recyclable === true
    ).length;

    // Non-recyclable items
    const nonRecyclableItems = totalScans - recyclableItems;

    // Average Eco Score
    const averageEcoScore =
      totalScans > 0
        ? (
            scans.reduce((sum, scan) => sum + scan.ecoScore, 0) /
            totalScans
          ).toFixed(1)
        : 0;

    // Highest Eco Score
    const highestEcoScore =
      totalScans > 0
        ? Math.max(...scans.map((scan) => scan.ecoScore))
        : 0;

    // Recent 5 scans
    const recentScans = scans.slice(0, 5);

    res.status(200).json({
      success: true,
      stats: {
        totalScans,
        recyclableItems,
        nonRecyclableItems,
        averageEcoScore,
        highestEcoScore,
        recentScans,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};