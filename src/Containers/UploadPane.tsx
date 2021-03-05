import { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

const useStyles = makeStyles((theme: any) => ({
	root: {
		margin: theme.spacing(1),
		display: 'flex',
	}
}));

type Props = {
	imgUploaded: any;
	boardId: number;
};

// type TImage = {
// 	lastModified: number;
// 	lastModifiedDate: Date;
// 	name: string;
// 	path: string;
// 	size: number;
// 	webkitRelativePath: string;
// };

export default function UploadPane({ imgUploaded }: Props) {
	const [open, setOpen] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const classes = useStyles();

	const handleSubmitImage = (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onloadend = () => {
			uploadImage(reader.result);
		};
		reader.onerror = () => {
			console.error('Image upload error');
			setErrMsg('Image upload Error');
		};
	};

	const uploadImage = async (base64EncodedImage: any) => {
		try {
			await fetch('/api/v1/images/upload', {
				method: 'POST',
				body: JSON.stringify({ data: base64EncodedImage }),
				headers: { 'Content-Type': 'application/json' },
			});
			console.log('good')
			setSuccessMsg('Image uploaded successfully')
		} catch (error) {
			console.error(error);
			setErrMsg('Something went wrong');
		}
	};

	return (
		<>
			<Button
				className={classes.root}
				variant="contained"
				color="primary"
				onClick={() => setOpen(true)}
			>
				Add Images
			</Button>

			<DropzoneDialog
				acceptedFiles={['image/*']}
				cancelButtonText={'cancel'}
				submitButtonText={'submit'}
				clearOnUnmount={false}
				maxFileSize={50000000}
				open={open}
				onClose={() => setOpen(false)}
				onSave={(file) => {
					console.log('onSave: ', file);
					handleSubmitImage(file);
					setOpen(false);
				}}
				showPreviews={true}
				showFileNamesInPreview={true}
			/>
		</>
	);
}
