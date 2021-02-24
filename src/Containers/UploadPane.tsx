import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core';

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

export default function UploadPane(props: any) {
	const classes = useStyles()
	const maxSize = 104576;

	const handleUploadSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const files = e.target.files;

		if (files) {
			for (const file of files) {
				const formData = new FormData();
				formData.append('img_src', file);
				fetch('http://localhost:3000/images', {
					method: 'POST',
					body: formData,
				})
					.then((resp) => resp.json())
					.then((newImage) => {
						props.imgUploaded(newImage);
					});
			}
		}
	};

	return (
		<div className={classes.removeBtn}>
			<label className={classes.removeBtn} htmlFor='image-upload'>

					<input
						type="file"
						accept="image/*"
						id="image-upload"
						multiple={true}
						onChange={handleUploadSubmit}
						style={{ display: 'none' }}
				/>

				<Button className={classes.removeBtn} component='span' variant='contained'>
					Upload Images
				</Button>
				</label>
		</div>
	);
}