# Enabling GPU Support

This guide explains how to enable GPU support on your Compute Resource Node (CRN), allowing users to deploy instances with GPU capabilities. The process involves two main aspects:
1. Understanding the available GPU options and pricing
2. Configuring your CRN for GPU support

::: warning Prerequisites
Before enabling GPU support:
- Enable PAYG support and IPv6 on your CRN (this is required for GPU billing)
- Follow the steps at [Enable PAYG](/nodes/compute/advanced/pay-as-you-go/)
:::

## Available GPUs and Pricing

The following GPUs are currently compatible with Aleph Cloud. More options will be added as they are tested and validated.

### Standard GPUs

Consumer and workstation-grade GPUs suitable for most workloads:

| GPU Model    | vCPU | RAM   | vRAM  | Price approx    |
|--------------|------|-------|-------|------------------|
| L40S         | 12   | 72 GB | 48 GB | 3.33 ALEPH/hour |
| RTX 5090     | 8    | 48 GB | 36 GB | 2.24 ALEPH/hour |
| RTX 4090     | 6    | 36 GB | 24 GB | 1.68 ALEPH/hour |
| RTX 3090     | 4    | 24 GB | 24 GB | 1.12 ALEPH/hour |
| RTX 4000 ADA | 3    | 18 GB | 20 GB | 0.84 ALEPH/hour |

### Premium GPUs

Datacenter-grade GPUs optimized for high-performance computing:

| GPU Model | vCPU | RAM    | vRAM  | Price approx     |
|-----------|------|--------|-------|------------------|
| H100      | 24   | 144 GB | 80 GB | 13.33 ALEPH/hour |
| A100      | 16   | 96 GB  | 80 GB | 8.89  ALEPH/hour |

::: info Hardware Requirements
All GPUs must be connected via PCIe 4.0 16x each for optimal performance.
:::

## GPU Configuration Guide {#gpu-configuration}

### Enabling Kernel Modules

::: tip
It is possible to enable multiple GPUs on one CRN. The following steps will help you configure the required kernel modules.
:::

### Configuration Steps

::: warning
Execute these commands as root. On Ubuntu systems, use `sudo`.
:::

1. Edit initramfs to attach GPU to vfio:
   `vi /etc/initramfs-tools/modules` and set the content to 
```
attach : vfio vfio_iommu_type1 vfio_virqfd vfio_pci ids=10de:27b0,10de:22bc
```

replacing the id's `10de:27b0,10de:22bc` with id's of the VGA card, there should be 2, the Video device and the GPU audio device.
You can get them running `lspci -nvv` as root user. 

2. Edit `/etc/modules` to ensure that lods GPU to vfio:
`vi /etc/modules` and add
```
attach: vfio vfio_iommu_type1 vfio_pci ids=10de:27b0,10de:22bc
```

3. Modify nvidia drivers to load after the vfio:
`vi /etc/modprobe.d/nvidia.conf`

set
```
softdep nouveau pre: vfio-pci
softdep nvidia pre: vfio-pci
softdep nvidia* pre: vfio-pci
```

4. Get the know alias from the PCI device:
`cat /sys/bus/pci/devices/0000:01:00.0/modalias`
replace pci address  `0000:01:00.0` with the one for your GPU, you can get it using `lspci` 

5. Configure vfio module to use that devices:
`vi /etc/modprobe.d/vfio.conf`

```
blacklist nouveau
blacklist snd_hda_intel
alias pci:v000010DEd000027B0sv000010DEsd000016FAbc03sc00i00 vfio-pci
options vfio-pci ids=10de:27b0,10de:22bc
```

6. Enable modprobe vfio-pci
```
modprobe vfio-pci
```

7 . Update initramfs image with your changes:
```shell
update-initramfs -u -k all
```

8. Finally Reboot the server
```shell
reboot
```

9. Confirm that the `vfio-pci` kernel module is used for the card
```shell
lspci -k
```

Should display something similar to
```
[...]
01:00.0 VGA compatible controller: NVIDIA Corporation AD104GL [RTX 4000 SFF Ada Generation] (rev a1)
	Subsystem: NVIDIA Corporation AD104GL [RTX 4000 SFF Ada Generation]
	Kernel driver in use: vfio-pci
	Kernel modules: nvidiafb, nouveau, nvidia_drm, nvidia
01:00.1 Audio device: NVIDIA Corporation Device 22bc (rev a1)
	Subsystem: NVIDIA Corporation Device 16fa
	Kernel driver in use: vfio-pci
	Kernel modules: snd_hda_intel
[...]
```

10. Enable GPU support in Aleph-VM
In the CRN configuration `/etc/aleph-vm/supervisor.env`, enable the GPU support
```
ALEPH_VM_ENABLE_GPU_SUPPORT=True
```

Don't forget to also set ALEPH_VM_PAYMENT_RECEIVER_ADDRESS and [enable PAYG](/nodes/compute/advanced/pay-as-you-go).

11. Confirm that the GPU are listed and supported on the CRN index page.

Start or restart your aleph-vm supervisor, open the index page, and it should list your GPU
```
GPUs

   • NVIDIA | AD104GL [RTX 4000 SFF Ada Generation] is compatible ✅
```