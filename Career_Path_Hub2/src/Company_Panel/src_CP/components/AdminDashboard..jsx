import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from "react-google-charts";
import { data, options } from './data/data';
import ChartComponent from '../../component/ChartComponent';

const AdminDashboard = ({ components }) => {
    return (
        <Box>
            {/* Dashboard Header */}
            <Typography variant="h4" sx={{ color: "#333", pb: 3 }}>
                Dashboard
            </Typography>

            {/* Statistics Section */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 4, md: 6 }}
            >
                {components.stats.map((stat, index) => (
                    <StatComponent
                        key={index}
                        value={stat.value}
                        icon={stat.icon}
                        description={stat.description}
                    />
                ))}
            </Stack>

            {/* Charts Section */}
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 4 }}
                spacing={{ xs: 2, sm: 4, md: 6 }}>
                {components.charts.map((chart, index) => (
                    <ChartComponent key={index}>
                        <Chart
                            chartType={chart.type}
                            data={chart.data}
                            options={{
                                ...chart.options,
                                backgroundColor: '#f4f4f4',
                                colors: ['#1976d2', '#4caf50'],
                                legend: { position: 'bottom' },
                            }}
                            width="100%"
                            height="300px"
                        />
                    </ChartComponent>
                ))}
            </Stack>
        </Box>
    );
}

export default AdminDashboard;
