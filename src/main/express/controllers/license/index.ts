import { getBiosSerialNumber, getStorageSerialNumber, XOREncryption, validateLicense } from "../../functions";
import { Request, Response } from "express";
import { CODE_KEY } from "../../shared";

export const getKey = async (_req: Request, res: Response): Promise<any> => {
    try {
        const bios = await getBiosSerialNumber();
        const strg = await getStorageSerialNumber();
        if (!bios || !strg) return res.status(400).json({ key: null, message: `bios or storage is missing`});
        let tmp = `${bios}${strg}`.replace(/[^\w]/g, '').replace('.', '').replace('_', '').replace('-', '');
        tmp = await XOREncryption(CODE_KEY, tmp);
        return res.status(200).json({ key: tmp, message: `key is generated`});
    } catch (error: any) {
        return res.status(500).json({ key: null, message: `Internal Server Error: ${error}`});
    }
}

export const validate = async (req: Request, res: Response): Promise<any> => {
    try {
        const { license } = req.body;
        if (!license) return res.status(400).json({ isLicense: false, message: 'License key is missing'});
        if (license.length < 1) return { isLicense: false, message: 'License key is null or undefined'}
        const licenseValidation = await validateLicense(license);
        if (!licenseValidation.isValidated) return res.status(400).json({ isLicense: false, message: licenseValidation.message });
        return res.status(200).json({ isLicense: true, message: licenseValidation.message });
    } catch (error: any) {
        return res.status(500).json({ isLicense: false, message: `Internal Server Error: ${error}`});
    }
}

export const generateLicense = async (req: Request, res: Response): Promise<any> => {
    try {
        const { key } = req.body;
        if (!key)  return res.status(400).json({ license: null, message: 'Key is undefined or null' });
        const currentDate = new Date();
        const formatter = new Intl.DateTimeFormat('en-PH', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(currentDate);
        const formattedDate = `${year}/${month}/${day}`;
        let c746D706B79  =`${String(key)}.${'retail'}.${'administrator'}.${'365'}.${formattedDate}`;
        let rst = await XOREncryption(CODE_KEY, c746D706B79);
        rst = (!rst || rst === null || rst === undefined)?'NA':rst;
        return res.status(200).json({ license: rst , message: 'License generated'});
    } catch (error: any) {
        return res.status(500).json({ isLicense: false, message: `Internal Server Error: ${error}`});
    }
}

