import React from 'react'

export default function RightBar(UserData) {

    let newDate = new Date()
    let separator = "/";
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let month0 = "0" + newDate.getMonth();
    let year = newDate.getFullYear();

    let day0 = newDate.getDay()
    let day="Monday";
    switch (day0) {
        case 1: day = "Monday"
        break;
        case 2: "Tuesday"
        break;
        case 3: "Wednesday"
        break;
        case 4: day = "Thursday"
        break;
        case 5: day = "Friday"
        break;
        case 6: day = "Saturday"
        break;
        case 0: day = "Sunday"
        break;
    }
//    const meow = Keow[0]
   console.log(UserData)
    return (
        <div className="right-bar">
            <div className="top-part">
            {/* <span>{meow[]}</span> */}
            <span></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>

            </div>
            <div className="right-content">

                <div className="allDays">
                    <div className="day">
                        <div className="header">Schedule-<b>{day}</b> </div>
                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">9:30 - 10:30 AM</div>
                                <div className="task-name">lecture 1</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Modeling & Simulation
                            </div>
                        </div>

                        <div className="task-box blue">
                            <div className="description-task">
                                <div className="time">10:30 - 11:30 AM</div>
                                <div className="task-name">lecture 2</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Data Mining & Analysis
                            </div>
                        </div>

                        <div className="task-box red">
                            <div className="description-task">
                                <div className="time">11:30 AM - 12:30 PM</div>
                                <div className="task-name">lecture 3</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Linear Algebra & Probability Theory
                            </div>
                        </div>

                        <div className="task-box green">
                            <div className="description-task">
                                <div className="time">12:30 - 1:30 PM</div>
                                <div className="task-name">lecture 4</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Compiler Design
                            </div>
                        </div>

                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">2:30 - 5:30 PM</div>
                                <div className="task-name">Lab</div>
                            </div>
                            <div className="more-button">
                                CL 7
                            </div>
                            <div className="members">
                                Data Mining & Analysis Pr.
                            </div>
                        </div>
                    </div>

                    <div className="day">
                        <div className="header">Schedule - <b>Tuesday</b> </div>
                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">9:30 - 10:30 AM</div>
                                <div className="task-name">lecture 1</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Modeling & Simulation
                            </div>
                        </div>

                        <div className="task-box blue">
                            <div className="description-task">
                                <div className="time">10:30 - 11:30 AM</div>
                                <div className="task-name">lecture 2</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Data Mining & Analysis
                            </div>
                        </div>

                        <div className="task-box red">
                            <div className="description-task">
                                <div className="time">11:30 AM - 12:30 PM</div>
                                <div className="task-name">lecture 3</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Linear Algebra & Probability Theory
                            </div>
                        </div>

                        <div className="task-box green">
                            <div className="description-task">
                                <div className="time">12:30 - 1:30 PM</div>
                                <div className="task-name">lecture 4</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Compiler Design
                            </div>
                        </div>

                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">2:30 - 5:30 PM</div>
                                <div className="task-name">Lab</div>
                            </div>
                            <div className="more-button">
                                CL 7
                            </div>
                            <div className="members">
                                Data Mining & Analysis Pr.
                            </div>
                        </div>

                    </div>

                    <div className="day">
                        <div className="header">Schedule - <b>Wednesday</b> </div>


                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">9:30 - 10:30 AM</div>
                                <div className="task-name">lecture 1</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Modeling & Simulation
                            </div>
                        </div>

                        <div className="task-box blue">
                            <div className="description-task">
                                <div className="time">10:30 - 11:30 AM</div>
                                <div className="task-name">lecture 2</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Data Mining & Analysis
                            </div>
                        </div>

                        <div className="task-box red">
                            <div className="description-task">
                                <div className="time">11:30 AM - 12:30 PM</div>
                                <div className="task-name">lecture 3</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Linear Algebra & Probability Theory
                            </div>
                        </div>

                        <div className="task-box green">
                            <div className="description-task">
                                <div className="time">12:30 - 1:30 PM</div>
                                <div className="task-name">lecture 4</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Compiler Design
                            </div>
                        </div>

                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">2:30 - 5:30 PM</div>
                                <div className="task-name">Lab</div>
                            </div>
                            <div className="more-button">
                                CL 7
                            </div>
                            <div className="members">
                                Data Mining & Analysis Pr.
                            </div>
                        </div>

                    </div>

                    <div className="day">
                        <div className="header">Schedule - <b>Thursday</b> </div>


                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">9:30 - 10:30 AM</div>
                                <div className="task-name">lecture 1</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Modeling & Simulation
                            </div>
                        </div>

                        <div className="task-box blue">
                            <div className="description-task">
                                <div className="time">10:30 - 11:30 AM</div>
                                <div className="task-name">lecture 2</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Data Mining & Analysis
                            </div>
                        </div>

                        <div className="task-box red">
                            <div className="description-task">
                                <div className="time">11:30 AM - 12:30 PM</div>
                                <div className="task-name">lecture 3</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Linear Algebra & Probability Theory
                            </div>
                        </div>

                        <div className="task-box green">
                            <div className="description-task">
                                <div className="time">12:30 - 1:30 PM</div>
                                <div className="task-name">lecture 4</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Compiler Design
                            </div>
                        </div>

                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">2:30 - 5:30 PM</div>
                                <div className="task-name">Lab</div>
                            </div>
                            <div className="more-button">
                                CL 7
                            </div>
                            <div className="members">
                                Data Mining & Analysis Pr.
                            </div>
                        </div>

                    </div>

                    <div className="day">
                        <div className="header">Schedule - <b>Friday</b> </div>


                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">9:30 - 10:30 AM</div>
                                <div className="task-name">lecture 1</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Modeling & Simulation
                            </div>
                        </div>

                        <div className="task-box blue">
                            <div className="description-task">
                                <div className="time">10:30 - 11:30 AM</div>
                                <div className="task-name">lecture 2</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Data Mining & Analysis
                            </div>
                        </div>

                        <div className="task-box red">
                            <div className="description-task">
                                <div className="time">11:30 AM - 12:30 PM</div>
                                <div className="task-name">lecture 3</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Linear Algebra & Probability Theory
                            </div>
                        </div>

                        <div className="task-box green">
                            <div className="description-task">
                                <div className="time">12:30 - 1:30 PM</div>
                                <div className="task-name">lecture 4</div>
                            </div>
                            <div className="more-button">
                                L8
                            </div>
                            <div className="members">
                                Compiler Design
                            </div>
                        </div>

                        <div className="task-box yellow">
                            <div className="description-task">
                                <div className="time">2:30 - 5:30 PM</div>
                                <div className="task-name">Lab</div>
                            </div>
                            <div className="more-button">
                                CL 7
                            </div>
                            <div className="members">
                                Data Mining & Analysis Pr.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
