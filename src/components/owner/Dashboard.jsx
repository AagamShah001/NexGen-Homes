import "../../assets/css/dashboard.css";
import GroupsIcon from '@mui/icons-material/Groups';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { ViewProperty } from './ViewProperty';
import { AddProperty } from "./AddProperty";
import { ClickProperty } from "./ClickProperty";
import { useState } from "react";



export const Dashboard = () => {

    const [activeSection, setActiveSection] = useState("view");


    return (
        <div className='dashboard-cont'>
            <div className='dashboard-head'>
            </div>

            <div className='dashboard-body'>
                <div className='dashboard-body-card'>
                    <div className='dbody-card-title'>Your Property</div>
                    <div className='dbody-card-nav-cont'>
                        <div className='dbody-card-nav'>
                            <button className='dbody-card-nav-bt' onClick={() => setActiveSection("add")}>Add Property</button>
                            <button className='dbody-card-nav-bt' onClick={() => setActiveSection("view")}>View Property</button>
                            <button className='dbody-card-nav-bt' onClick={() => setActiveSection("edit")}>Edit Property</button>
                            <button className='dbody-card-nav-bt' onClick={() => setActiveSection("reviews")}>Reviews</button>
                        </div>

                    </div>

                    <div className='dbody-card-view'>
                        <div className='dbody-card-overview'>
                            {activeSection === "add" && <AddProperty />}
                            {activeSection === "view" && <ViewProperty />}
                            {activeSection === "edit" && <ClickProperty />}
                            {activeSection === "reviews" && (
                                <Typography variant="body1">Reviews section coming soon.</Typography>
                            )}

                        </div>
                    </div>

                </div>
            </div>

            <div className='dashboard-footer'>
                <div className='dashboard-footer-help'>
                    <div className='footer-help-title'>We’re here to help</div>
                    <div className='footer-help-card'>

                        <div className='fhelp-card'>
                            <div className='fhelp-card-icon'><GroupsIcon size={30} /></div>
                            <div className='fhelp-card-paragraph'>

                                <span>Join your local Host Club</span>
                                <p>Connect, collaborate and share
                                    with other hosts and community
                                    members.</p>

                            </div>
                        </div>

                        <div className='fhelp-card'>
                            <div className='fhelp-card-icon'><SupportAgentIcon size={30} /></div>
                            <div className='fhelp-card-paragraph'><span>Contact specialised support</span>
                                <p>As a new Owner, you get one-tap access to a specially trained support team.                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-footer-blog'>
                    <div className='footer-blog-title'>Resources and tips</div>
                    <div className='footer-blog-card'>

                        <Card sx={{ p: 2, height: 300, width: 345 }}>
                            <img
                                style={{ width: 345 }}
                                src="src\assets\img\blog-house.webp"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Help your listing stand out
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ p: 2, height: 300, width: 345 }}>
                            <img
                                style={{ width: 345 }}
                                src="src\assets\img\help.webp"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Review your price
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ p: 2, height: 300, width: 345 }}>
                            <img
                                style={{ width: '100%', height: 'auto' }}
                                src="src\assets\img\price.webp"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Writing an effective listing description
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}
