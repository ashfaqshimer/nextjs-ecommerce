import React from 'react';

import styles from './FormInput.module.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (
		<div className={styles['FormInput']}>
			<input
				autocomplete='false'
				className={styles['form-input']}
				onChange={handleChange}
				{...otherProps}
			/>
			{label ? (
				<label
					className={`${otherProps.value.length ? styles['shrink'] : ''} ${
						styles['form-input-label']
					}`}
				>
					{label}
				</label>
			) : null}
		</div>
	);
};

export default FormInput;
