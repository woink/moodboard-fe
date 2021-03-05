import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

const useStyles = makeStyles((theme: any) => ({
	root: {
		margin: theme.spacing(1),
		display: 'flex',
	},
	removeBtn: {
		marginTop: '1.5vh',
		marginLeft: '15vw',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
}));

// TODO: fix props here. it's related to App.tsx
// type Props = {
// 	imgUploaded: () => void

// }

type Props = {
	imgUploaded: any;
	boardId: number;
};

export default function UploadPane({ imgUploaded }: Props) {
	const [open, setOpen] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [errMsg, setErrMsg] = useState('');
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
			await fetch('http://localhost:5000/api/v1/images/upload', {
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
