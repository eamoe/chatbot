const FormInput = (props) => {
    const {cssStyle, fieldId, type, placeholder, value, onChange, disabled } = props
    return (
        <div className="mb-3">
            <input
                className={cssStyle}
                id={fieldId}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete="off"
            />
        </div>
    )
}
export default FormInput
