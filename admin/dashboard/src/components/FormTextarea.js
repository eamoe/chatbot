const FormTextarea = (props) => {
    const {cssStyle, fieldId, type, placeholder, value, onChange, disabled } = props
    return (
        <div className="mb-3">
            <textarea
                className={cssStyle}
                rows={5}
                id={fieldId}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete="off"
            >
            </textarea>
        </div>
    )
}
export default FormTextarea
