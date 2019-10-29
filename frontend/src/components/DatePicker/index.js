import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import { parseISO } from 'date-fns';

import { useField } from '@rocketseat/unform';

import { StyledDatePicker } from './styles';

export default function DatePicker({ name }) {
  const ref = useRef();

  const { fieldName, registerField, defaultValue } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    // eslint-disable-next-line
  }, [ref.current, fieldName]);

  return (
    <StyledDatePicker
      name={fieldName}
      locale={pt}
      selected={selected}
      onChange={date => setSelected(date)}
      timeFormat="HH:mm"
      dateFormat="dd/MM/yyyy - HH:mm"
      placeholderText="Data e hora do evento"
      autoComplete="off"
      showTimeSelect
      ref={ref}
    />
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  selectedDate: PropTypes.string,
};

DatePicker.defaultProps = {
  selectedDate: null,
};
