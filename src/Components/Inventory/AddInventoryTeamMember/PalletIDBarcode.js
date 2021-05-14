import React, { useEffect, useState } from 'react';
import { useBarcode } from 'react-barcodes';

const PalletIDBarcode = (props) => {
    const { palletId, setBarcode } = props

    const { inputRef } = useBarcode({
        value: palletId,
        options: {
          background: '#fff',
          displayValue: false,
        }
    });

    useEffect(() => {
        const qrCodeCanvas = document.getElementById("barcode-canvas");
        const qrCodeDataUri = qrCodeCanvas.toDataURL('image/jpeg');
        setBarcode(qrCodeDataUri);
    }, [inputRef])

    return (
        <canvas id="barcode-canvas" ref={inputRef} />
    );
}

export default PalletIDBarcode;