import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		display: 'flex',
		
	},
	removeBtn: {
		marginTop: '1.5vh',
		marginLeft: '15vw',
		justifyContent: 'center',
		alignItems: 'stretch'
	}
}))

// TODO: fix props here. it's related to App.tsx
// type Props = {
// 	imgUploaded: () => void

// }

type Props = {
	imgUploaded: any
	boardId: number
}

export default function UploadPane({imgUploaded}: Props) {
	const [fileInputState, setFileInputState] = useState('')
	const [selectedFile, setSelectedFile] = useState<Blob>()
	const [successMsg, setSuccessMsg] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const classes = useStyles()

	const handleImageInputChange = (e) => {
		const file = e.target.files[0]
		setSelectedFile(file)
		setFileInputState(e.target.value)
	}

	const handleSubmitImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!selectedFile) return
		const reader = new FileReader()
		reader.readAsDataURL(selectedFile)
		reader.onloadend = () => {
			uploadImage(reader.result)
		}
		reader.onerror = () => {
			console.error('Image upload error')
			setErrMsg('Image upload Error')
		}
	};
	
	// TODO: uploadImage function 

	return (
		<div className={classes.removeBtn}>
			<label className={classes.removeBtn} htmlFor='image-upload'>

					<input
						type="file"
						accept="image/*"
						id="image-upload"
						multiple={true}
						onChange={handleSubmitImage}
						style={{ display: 'none' }}
				/>

				<Button className={classes.removeBtn} component='span' variant='contained'>
					Upload Images
				</Button>
				</label>
		</div>
	);
}
