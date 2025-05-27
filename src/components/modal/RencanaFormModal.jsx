

const RencanaFormModal = ({ show, onClose, onSubmit }) => {
    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Buat Rencana</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Target</label>
                        <input type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Harga (Rp)</label>
                        <input type="number" required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RencanaFormModal;