const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Interview = require("../../models/Interview");
const Joinee = require("../../models/Joinee");

router.get("/", auth, async (req, res) => {
  try {
    const { year } = req.query;
    // const joinees = await Joinee.find();
    // res.status(200).json(joinees);
    let total_applicant,
      shortlisted_candidate,
      hired_candidate,
      rejected_candidate,
      resigned_candidate,
      on_boarding_candidates,
      in_process_candidates,
      time_to_hire,
      cost_per_hire;

    total_applicant = await Interview.count();
    shortlisted_candidate = await Interview.count({
      candidate_status: {
        $in: ["Shortlisted", "Shortlisted - Different Role"],
      },
    });
    hired_candidate = await Joinee.count({
      status: { $in: ["Joined", "joined", "Selected", "selected"] },
    });
    rejected_candidate = await Interview.count({
      candidate_status: { $in: ["Not Shortlisted", "Not Selected"] },
    });
    resigned_candidate = await Interview.count({
      candidate_status: { $in: ["Resigned", "resigned"] },
    });
    on_boarding_candidates = await Interview.count({
      candidate_status: "On Boarding",
    });
    in_process_candidates = await Interview.count({
      candidate_status: "In Process",
    });

    time_to_hire = 99;
    cost_per_hire = 999;

    // 2. Application source
    let distinct_source = await Interview.aggregate([
      {
        $group: {
          _id: "$agency",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // 4. Total Numbers of interviews overall and per sectors / offices
    let distinct_sector = await Interview.aggregate([
      {
        $group: {
          _id: "$sector",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // 5. Total Numbers of shortlisted candidates overall and per sectors / offices
    let distinct_selected_sector = await Interview.aggregate([
      {
        $match: {
          candidate_status: "Selected",
        },
      },
      {
        $group: {
          _id: "$sector",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // 6. Total Numbers of hired candidates overall and per sectors / offices.
    let distinct_hired_sector = await Joinee.aggregate([
      {
        $match: {
          status: "Joined",
        },
      },
      {
        $group: {
          _id: "$sector",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // 7. Total Numbers of resigned candidates overall and per sectors / offices.
    let distinct_resigned_sector = await Interview.aggregate([
      {
        $match: {
          candidate_status: { $in: ["Resigned", "resigned"] },
        },
      },
      {
        $group: {
          _id: "$sector",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // 8. Total Numbers of candidates per Job Level
    let candidates_per_joblevel = await Interview.aggregate([
      {
        $group: {
          _id: "$joblevel",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    let response = {
      total_applicant,
      shortlisted_candidate,
      hired_candidate,
      rejected_candidate,
      resigned_candidate,
      on_boarding_candidates,
      in_process_candidates,
      time_to_hire,
      cost_per_hire,
      distinct_source,
      distinct_sector,
      distinct_selected_sector,
      candidates_per_joblevel,
      distinct_hired_sector,
      distinct_resigned_sector,
    };

    // filter by Year
    if (year) {
      let distinct_source_by_year = await Interview.aggregate([
        {
          $match: {
            year: year,
          },
        },
        {
          $group: {
            _id: "$agency",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let distinct_sector_by_year = await Interview.aggregate([
        {
          $match: {
            year: year,
          },
        },
        {
          $group: {
            _id: "$sector",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let distinct_selected_sector_by_year = await Interview.aggregate([
        {
          $match: {
            candidate_status: "Selected",
            year: year,
          },
        },
        {
          $group: {
            _id: "$sector",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let distinct_hired_sector_by_year = await Joinee.aggregate([
        {
          $match: {
            status: "Joined",
            year: year,
          },
        },
        {
          $group: {
            _id: "$sector",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let distinct_resigned_sector_by_year = await Interview.aggregate([
        {
          $match: {
            candidate_status: { $in: ["Resigned", "resigned"] },
            year: year,
          },
        },
        {
          $group: {
            _id: "$sector",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let candidates_per_joblevel_by_year = await Interview.aggregate([
        {
          $match: {
            year: year,
          },
        },
        {
          $group: {
            _id: "$joblevel",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      response = {
        ...response,
        distinct_source_by_year,
        distinct_sector_by_year,
        distinct_selected_sector_by_year,
        candidates_per_joblevel_by_year,
        distinct_hired_sector_by_year,
        distinct_resigned_sector_by_year,
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Occurred");
  }
});

module.exports = router;
