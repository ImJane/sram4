<?php $this->context->layout = '@components/layout'; ?>

<?php $this->sram_require('./home.es6'); ?>
<?php $this->sram_require('./home.less'); ?>

<div class="views">
	<?= $this->sram_require('@components/header', ['data' => []]) ?>
	<div class="page">
		views/home/home.php
	</div>
</div>

<?php $this->block['js_placeholder']?>
<script type="text/javascript">
	import { util } from '@components/util';
	sram.use(['@components/util']).then(({ util })=>{
		
	}).catch(()=>{ })
</script>
<?php $this->endBlock['js_placeholder']?>

<?php $this->block['js_placeholder']?>
<script type="text/javascript">
	import { util } from '@components/util';
	sram.use(['@components/util']).then(({ util })=>{
		
	}).catch(()=>{ })
</script>
<?php $this->endBlock['js_placeholder']?>