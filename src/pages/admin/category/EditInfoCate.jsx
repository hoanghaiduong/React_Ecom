import { Icon } from "@material-tailwind/react";
import { Autocomplete, Box, FormControl, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import iconList from './ListIcon';
export default function EditInfoCate(props) {
    const mainProps = props.dataComponent;
    const valueInput = props.dataComponent.categoryInput;
    const errors_list = props.dataComponent.errorList;
    const handleChangeInput = (e) => {
        mainProps.handleInput(e);
    }
    const handleChangeIcon = (e, newValue) => {
        mainProps.ArrayIcon(e, newValue);
    }
    console.log(valueInput);
    return (
        <>
            <Box sx={{ flexShrink: 1 }}>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <FormControl fullWidth  >
                            <TextField
                                required
                                label="URL Danh mục"
                                name="slug"
                                onChange={handleChangeInput}
                                value={valueInput.slug}
                                error={errors_list.slug}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                required
                                label="Tên"
                                name="name"
                                onChange={handleChangeInput}
                                value={valueInput.name}
                                error={errors_list.name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                required
                                multiline
                                rows={4}
                                label="Mô tả danh mục"
                                name="descrip"
                                onChange={handleChangeInput}
                                value={valueInput.descrip}
                                error={errors_list.descrip}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={12} xs={12} sm={12}>
                        <FormControl fullWidth >
                            <Autocomplete
                                id="country-select-demo"
                                value={valueInput.name_icon}
                                onChange={handleChangeIcon}
                                options={iconList}
                                autoHighlight
                                getOptionLabel={(option) => option}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <Icon name={option} size="5xl" />
                                        {option}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Chọn icon cho danh mục"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12} sm={12} >
                        <Box sx={{ justifyContent: 'center' }}>
                            <FormControlLabel
                                control={
                                    <Switch checked={valueInput.status === 1 ? true : false} onChange={handleChangeInput} name="status" />
                                }
                                label={valueInput.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12} sm={12}>
                        <Box sx={{ justifyContent: 'center' }} >
                            <FormControlLabel
                                control={
                                    <Switch checked={valueInput.popular === 1 ? true : false} onChange={handleChangeInput} name="popular" />
                                }
                                label={valueInput.popular === 1 ? 'Phổ Biến' : 'Không Phổ Biến'}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12} sm={12}>
                        <FormControlLabel
                            control={
                                <Switch checked={valueInput.featured === 1 ? true : false} onChange={handleChangeInput} name="featured" />
                            }
                            label={valueInput.featured === 1 ? 'Đặc Sắc' : 'Không Đặc Sắc'}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}