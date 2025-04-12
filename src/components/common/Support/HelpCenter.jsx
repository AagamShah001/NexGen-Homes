import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    CardContent,
    Card,
    Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChatBot } from './ChatBot';
import { Link } from 'react-router-dom';

export const HelpCenter = () => {
    const FAQs = [
        {
            question: 'How do I list my property on NexGen Homes?',
            answer: "Log in to your account, go to 'List Property', and fill in the property details including images, price, and location."
        },
        {
            question: 'How can I verify my account or property?',
            answer: "After registering, go to 'My Profile' and upload the required documents. Verification usually takes 24–48 hours."
        },
        {
            question: 'How do I manage my bookings?',
            answer: "Visit your Dashboard → 'My Bookings'. There you can confirm, reschedule, or cancel bookings."
        },
        {
            question: 'How do I boost my property visibility?',
            answer: "You can promote your listing using our 'Featured Listing' service found under the 'Marketing' tab."
        },
        {
            question: 'How do I contact NexGen Homes support?',
            answer: "You can use the in-app chatbox to raise a complaint, or email us at help@nexgenhomes.com."
        },
        {
            question: 'Where can I find my payment receipts?',
            answer: "Go to your Dashboard → 'Payments' → 'Receipts' to view or download your transaction history."
        },
        {
            question: 'What are the system requirements to use the platform?',
            answer: "NexGen Homes works best on the latest versions of Chrome, Firefox, or Edge with a stable internet connection."
        },
        {
            question: 'How can I unlink or delete my account?',
            answer: "Please contact support with a valid reason through the chatbox or email. Deletion requests are processed within 7 business days."
        }
    ];


    const blogArticles = [
        {
            title: 'Users are increasingly aware of sustainability in architecture: Zubin Master, Design Matrix',
            summary:
                'Clients are increasingly interested in sustainability, pushing for efficient energy solutions like solar panels. However, this requires advanced technology for effective implementation.',
            link:"https://realty.economictimes.indiatimes.com/videos/users-are-increasingly-aware-of-sustainability-in-architecture-zubin-master-design-matrix/114320718?utm_source=top_news&utm_medium=tagListing"
        },
        {
            title: 'RBI MPC Repo Rate Cut: Homebuyers should ensure income stability before investing in real estate',
            summary:
                'RBI MPC Repo Rate Cut: With the RBI deciding to reduce repo rate by 25 bps, experts urge homebuyers to ensure income stability before investing in a house',
            link:"https://www.hindustantimes.com/real-estate/rbi-mpc-repo-rate-cut-homebuyers-should-ensure-income-stability-before-investing-in-real-estate-101744194419910.html#:~:text=RBI%20MPC%20Repo%20Rate%20Cut%3A%20With%20the%20RBI%20deciding%20to,a%20similar%20reduction%20in%20February."
        },
        {
            title: 'Will AI Replace Real Estate Brokers In India?',
            summary:
                'For decades, real estate transactions have been deeply reliant on the expertise and network of brokers.Whether it’s buying a dream home, investing in commercial property, or leasing office space, brokers have traditionally played the role of matchmakers, negotiators, and market advisors. But with the rise of artificial intelligence (AI) and digital platforms, there’s an ongoing debate: will technology replace brokers entirely, or will it simply redefine their role in the industry?',
            link:"https://timesproperty.com/article/post/will-ai-replace-real-estate-brokers-in-india-blid9564"
        },
        {
            title: 'Brigade Group to develop luxury apartments, plots in Mysuru',
            summary:
                'Brigade Group said the Mysuru project will offer a total development potential of 0.37 million square feet and feature premium plots and high-end apartments',
            link:"https://www.hindustantimes.com/real-estate/brigade-group-to-develop-luxury-apartments-plots-in-mysuru-eyes-225-crore-revenue-101744097402277.html"
        },
        {
            title: 'Real Estate in India: What do homebuyers want in India’s luxury housing market? Insights from Vineet Dawar of Elan Group',
            summary:
                'Luxury Real Estate in Delhi NCR: The luxury realty sector in Delhi NCR is experiencing an unprecedented surge, driven by exponential economic growth, increasing disposable incomes and changing lifestyle expectations.',
            link:"https://www.etnownews.com/real-estate/real-estate-in-india-what-homebuyers-want-in-indias-luxury-housing-market-insights-from-vineet-dawar-of-elan-group-exclusive-article-119450454"
        },
        {
            title: "How social media is reshaping India's interior design industry",
            summary:
                'In the seventh episode of Architects of Tomorrow, Ridhi Khosla Jalan, Kirti Dodeja, and Swathy Sivaraman—discuss their design philosophies, the impact of social media, client expectations, and the beautiful chaos of translating digital inspiration into meaningful spaces.',
            link:"https://realty.economictimes.indiatimes.com/videos/ep07-how-social-media-is-reshaping-indias-interior-design-industry/120070514#:~:text=There's%20more%20awareness%20about%20design,It's%20influencing%20creativity%20through%20exposure."
        }
    ];


    return (
        <Container sx={{ py: 1 }}>

            <Typography variant="h4" gutterBottom>
                Help Center
            </Typography>

            {/* Complaint Chatbox */}
            <Box sx={{ mb: 4 }}>
                <ChatBot />
            </Box>

            {/* FAQs Section */}
            <Box sx={{ mb: 1 }}>
                <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                {FAQs.map((faq, idx) => (
                    <Accordion key={idx}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            {/* Blog Articles */}
            <Box sx={{ mt: 10, mb: 10 }}>
                <Typography variant="h5" gutterBottom>
                    Top Articles
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        mt: 3,
                        gap: 2,
                    }}
                >
                    {blogArticles.map((article, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            component={Link} 
                            target='_blank'
                            to={article.link}
                            sx={{
                                width: 350,
                                height: 155,
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 1,
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                        >
                            <CardContent sx={{ p: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom >
                                    {article.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{lineHeight: 2}}
                                >
                                    {article.summary}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

        </Container>
    );
};
