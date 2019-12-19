import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import API from '../api';

export default function UserAutoComplete({ onChange, selectedUser }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const handleValueChange = async ({ target }) => {
    setLoading(true);
    const { value } = target;
    if (value) {
      const { data } = await API.getUsersList(value);
      setOptions(data.map(e => ({ ...e, value: e.name })));
    }
    setLoading(false);
  };

  return (
    <Autocomplete
      style={{ width: '40%' }}
      open={open}
      onOpen={({ target }) => {
        if (target.value) {
          setOpen(true);
        }
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={selectedUser}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="User name"
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            onChange: handleValueChange,
            onBlur: ({ target }) => onChange(target.value),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
