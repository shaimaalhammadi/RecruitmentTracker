const mongoose = require("mongoose");

const JoineeSchema = new mongoose.Schema({
    candidate_name: {
        type: String,
        required: false
    },
    role_position: {
        type: String,
        required: false
    },
    grade: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    sector: {
        type: String,
        required: false
    },
    jobcategory: {
        type: String,
        required: false
    },
    joblevel: {
        type: String,
        required: false
    },
    start_date: {
        type: String,
        required: false
    },
    year: {
        type: String,
    },
    application_to_resignation: {
        type: String,
        required: false
    },
    application_to_joining: {
        type: String,
        required: false
    },
    open_application: {
        type: String,
        required: false
    },
    date_request_to_resign: {
        type: String,
        required: false
    },
    joining_date: {
        type: String,
        required: false
    },
    salary_offered: {
        type: String,
        required: false
    },
    required_documents: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_sent: {
            type: String,
            required: false
        },
        date_received: {
            type: String,
            required: false
        }
    },
    initial_offer: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_sent: {
            type: String,
            required: false
        },
        date_received: {
            type: String,
            required: false
        }
    },
    hrc: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    offical_offer_letter: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    tarasul: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_submitted: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        },
        days_in_tarasul: {
            type: String,
            required: false
        }
    },
    medical_assesment: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    adsg: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_requested: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    reference_check: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    resignation_requested: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    notice_period: {
        type: String,
        required: false
    },
    division: {
        type: String,
        required: false
    },
    employment_contract: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    joining_forms: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    new_joiner_checklist: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    },
    new_joiner_bio: {
        who: {
            type: String,
            required: false
        },
        done: {
            type: String,
            required: false
        },
        date_completed: {
            type: String,
            required: false
        }
    }
}, {
    timestamps: true
});

module.exports = Joinee = mongoose.model('joinee', JoineeSchema);

