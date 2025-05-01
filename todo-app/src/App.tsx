import "./App.css";
import { Grid, Box } from "@mui/material";
import DateCalendar from "./components/calendar/Calendar";
import TaskForm from "./components/form/TaskForm";
import ListBox from "./components/listBox/ListBox";
function App() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Grid
        container
        spacing={6}
        justifyContent={{ xs: "center", md: "space-around" }}
        alignItems="stretch"
        direction={{ xs: "column", md: "row" }}
        wrap="nowrap"
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { xs: "auto", md: "100vh" },
            order: { xs: 0, md: 2 },
            py: 6,
          }}
        >
          <DateCalendar />
        </Grid>

        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { xs: "auto", md: "100vh" },
            order: { xs: 1, md: 1 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "100%",
              maxWidth: 800,
              px: 2,
            }}
          >
            <TaskForm />
            <ListBox />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
