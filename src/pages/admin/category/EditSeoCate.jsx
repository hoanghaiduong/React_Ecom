import { Box, FormControl, Grid, TextField } from '@mui/material';
export default function EditSeoCate({ dataComponent }) {
    const mainProps = dataComponent;
    const valueInput = dataComponent.categoryInput;
    const handleInput = (e) => {
        mainProps.handleInput(e);
    }
    return (
        <>
            <Box sx={{ flexShrink: 1 }}>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                required
                                multiline
                                rows={4}
                                label="Tiêu đề (meta)"
                                name="meta_title"
                                onChange={handleInput}
                                value={valueInput.meta_title ? valueInput.meta_title : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                required
                                multiline
                                rows={4}
                                label="Mô tả (meta)"
                                name="meta_descrip"
                                onChange={handleInput}
                                value={valueInput.meta_descrip ? valueInput.meta_descrip : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                required
                                multiline
                                rows={4}
                                label="Thẻ keyword(từ khoá)"
                                name="meta_keyword"
                                onChange={handleInput}
                                value={valueInput.meta_keyword ? valueInput.meta_keyword : ''}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}