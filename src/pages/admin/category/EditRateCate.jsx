import { Box, Grid, InputLabel, Rating, Slider } from '@mui/material';

function EditRateCate(props) {
    const mainProps = props.dataComponent;
    const valueInput = props.dataComponent.categoryInput;
    const handleChangeInput = (e) => {
        mainProps.handleInput(e);
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className="mb-5">
                <Grid container columnSpacing={5}>
                    <Grid item xs={12} sm={6} md={6}>
                        <InputLabel disabled>Chỉ số tăng (%)</InputLabel>
                        <Slider
                            aria-label="up"
                            name="RateUp"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={100}
                            value={valueInput.RateUp}
                            onChange={handleChangeInput}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <InputLabel disabled>Chỉ số giảm (%)</InputLabel>
                        <Slider
                            aria-label="down"
                            name="RateDown"
                            valueLabelDisplay="auto"
                            onChange={handleChangeInput}
                            step={10}
                            value={valueInput.RateDown}
                            marks
                            min={0}
                            max={100}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} >
                        <InputLabel disabled>Đánh giá có sẵn</InputLabel>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Rating name="Rating" value={Number(valueInput.Rating)} onChange={handleChangeInput} size="large" />
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default EditRateCate;